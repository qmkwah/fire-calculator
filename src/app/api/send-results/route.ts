import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { saveEmailLeadSimple, checkEmailExists } from '@/lib/supabase';

// Initialize Resend (only if API key exists)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    console.log('=== API CALLED ===');
    
    const body = await request.json();
    const { email, calculatorResults, userInputs } = body;
    
    console.log('Received email:', email);
    console.log('Calculator results:', JSON.stringify(calculatorResults, null, 2));
    console.log('User inputs:', JSON.stringify(userInputs, null, 2));

    // Validate input
    if (!email || !calculatorResults) {
      console.log('❌ Missing required data');
      return NextResponse.json(
        { error: 'Email and calculator results are required' },
        { status: 400 }
      );
    }

    // Check if email exists in database first
    console.log('🔍 Checking if email exists in database...');
    try {
      const emailExists = await checkEmailExists(email);
      console.log('Email exists check result:', emailExists);
      
      if (!emailExists) {
        console.log('📝 Email is new - attempting to save to database...');
        // Combine calculator results and user inputs for database storage
        const combinedData = {
          ...calculatorResults,
          ...userInputs
        };
        const saved = await saveEmailLeadSimple(email, 'calculator', combinedData);
        console.log('✅ Save result:', saved);
      } else {
        console.log('⏭️ Email already exists in database - skipping save');
      }
    } catch (dbError) {
      console.error('⚠️ Database operation failed (continuing with email):', dbError);
      // Don't fail the whole request if database fails
    }

    // Check if Resend is configured
    if (!resend || !process.env.RESEND_API_KEY) {
      console.log('📧 Resend not configured - simulating email send');
      console.log('Email would be sent to:', email);
      console.log('Results:', calculatorResults);
      
      // For development - simulate success
      return NextResponse.json({ 
        message: 'Email simulation successful (Resend not configured)',
        email: email 
      });
    }

    console.log('📧 Sending email via Resend...');

    // Format currency helper
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    };

    // Create email content
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Coast FIRE Results</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px; margin-bottom: 30px;">
    <h1 style="color: white; margin: 0; font-size: 28px;">🔥 Your Coast FIRE Results</h1>
    <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Personalized Financial Independence Analysis</p>
  </div>

  <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
    <h2 style="color: #2c3e50; margin-top: 0; text-align: center;">
      ${calculatorResults.isCoastFire ? '🎉 Congratulations! You\'ve reached Coast FIRE!' : '📈 You\'re on your way to Coast FIRE!'}
    </h2>
  </div>

  <div style="display: grid; gap: 20px; margin-bottom: 30px;">
    <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; border-left: 4px solid #2196f3;">
      <h3 style="color: #1976d2; margin-top: 0; font-size: 18px;">Coast FIRE Number</h3>
      <p style="font-size: 24px; font-weight: bold; color: #1976d2; margin: 5px 0;">
        ${formatCurrency(calculatorResults.coastFireNumber)}
      </p>
      <p style="color: #666; margin-bottom: 0; font-size: 14px;">Amount needed now to coast to FIRE</p>
    </div>

    <div style="background: #f3e5f5; padding: 20px; border-radius: 8px; border-left: 4px solid #9c27b0;">
      <h3 style="color: #7b1fa2; margin-top: 0; font-size: 18px;">Full FIRE Number</h3>
      <p style="font-size: 24px; font-weight: bold; color: #7b1fa2; margin: 5px 0;">
        ${formatCurrency(calculatorResults.fireNumber)}
      </p>
      <p style="color: #666; margin-bottom: 0; font-size: 14px;">Total needed to retire (based on ${userInputs.withdrawalRate}% rule)</p>
    </div>

    ${!calculatorResults.isCoastFire ? `
    <div style="background: #fff3e0; padding: 20px; border-radius: 8px; border-left: 4px solid #ff9800;">
      <h3 style="color: #f57c00; margin-top: 0; font-size: 18px;">Additional Needed</h3>
      <p style="font-size: 24px; font-weight: bold; color: #f57c00; margin: 5px 0;">
        ${formatCurrency(calculatorResults.additionalNeeded)}
      </p>
      <p style="color: #666; margin-bottom: 0; font-size: 14px;">Save this much more to reach Coast FIRE</p>
    </div>
    ` : ''}

    <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; border-left: 4px solid #4caf50;">
      <h3 style="color: #388e3c; margin-top: 0; font-size: 18px;">Future Value</h3>
      <p style="font-size: 24px; font-weight: bold; color: #388e3c; margin: 5px 0;">
        ${formatCurrency(calculatorResults.futureValue)}
      </p>
      <p style="color: #666; margin-bottom: 0; font-size: 14px;">
        What your ${formatCurrency(calculatorResults.currentSavings)} will grow to in ${calculatorResults.yearsToRetirement} years
      </p>
    </div>
  </div>

  <div style="background: #f5f5f5; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
    <h3 style="color: #2c3e50; margin-top: 0;">📊 Your Summary</h3>
    <p style="line-height: 1.8; margin-bottom: 0;">
      ${calculatorResults.isCoastFire 
        ? `Amazing! Your current savings of ${formatCurrency(calculatorResults.currentSavings)} will grow to ${formatCurrency(calculatorResults.futureValue)} by age ${userInputs.retirementAge}, which exceeds your FIRE goal of ${formatCurrency(calculatorResults.fireNumber)}. You can stop saving now and still retire comfortably!`
        : `You need ${formatCurrency(calculatorResults.coastFireNumber)} total to reach Coast FIRE. Since you have ${formatCurrency(calculatorResults.currentSavings)}, you need to save ${formatCurrency(calculatorResults.additionalNeeded)} more. Once you reach this amount, your money will grow to ${formatCurrency(calculatorResults.fireNumber)} by retirement without any additional savings.`
      }
    </p>
  </div>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 10px; text-align: center; margin-bottom: 25px;">
    <h3 style="color: white; margin-top: 0;">🎯 Next Steps</h3>
    <p style="color: #f0f0f0; margin-bottom: 20px;">Ready to accelerate your FIRE journey?</p>
    <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}" 
       style="display: inline-block; background: white; color: #667eea; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
      Try Other Calculators
    </a>
  </div>

  <div style="text-align: center; color: #666; font-size: 14px; border-top: 1px solid #eee; padding-top: 20px;">
    <p>This email was generated from your Coast FIRE Calculator results.</p>
    <p style="margin: 0;">Happy investing! 🚀</p>
  </div>
</body>
</html>
`;

    // Send email
    console.log('Sending email with Resend...');
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@resend.dev',
      to: [email],
      subject: `🔥 Your Coast FIRE Results - ${calculatorResults.isCoastFire ? 'You Made It!' : 'Keep Going!'}`,
      html: htmlContent,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email: ' + error.message },
        { status: 500 }
      );
    }

    console.log('✅ Email sent successfully!');
    console.log('Email ID:', data?.id);

    return NextResponse.json({ 
      message: 'Email sent successfully!',
      emailId: data?.id 
    });

  } catch (error) {
    console.error('=== API ERROR ===');
    console.error('Error details:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}