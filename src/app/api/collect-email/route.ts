import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { saveEmailLead, checkEmailExists } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const emailExists = await checkEmailExists(email);
    
    if (emailExists) {
      return NextResponse.json({ 
        success: true, 
        message: 'You are already subscribed!' 
      });
    }

    // Save to database
    const leadData = {
      email,
      source: source || 'homepage',
      calculator_type: null,
      calculator_results: null,
    };

    await saveEmailLead(leadData);

    // Send welcome email
    const welcomeEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1f2937; font-size: 28px; margin-bottom: 10px;">
            🔥 Welcome to FIRE Calculator!
          </h1>
          <p style="color: #6b7280; font-size: 16px;">
            Thanks for subscribing to our weekly FIRE tips!
          </p>
        </div>

        <!-- Welcome Message -->
        <div style="background-color: #f0fdf4; border: 2px solid #bbf7d0; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #065f46; font-size: 20px; margin-bottom: 15px;">
            🎉 You're all set!
          </h2>
          <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
            Every week, you'll receive actionable tips and strategies to help you achieve financial independence faster.
          </p>
          <p style="color: #374151; line-height: 1.6;">
            But why wait? Start your FIRE journey today with our Coast FIRE Calculator!
          </p>
        </div>

        <!-- Calculator CTA -->
        <div style="text-align: center; margin-bottom: 30px;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'}/calculator/coast-fire" 
             style="background-color: #3b82f6; color: white; padding: 15px 30px; 
                    border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
            Try the Coast FIRE Calculator →
          </a>
        </div>

        <!-- What to Expect -->
        <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h3 style="color: #1f2937; font-size: 18px; margin-bottom: 15px;">What to expect:</h3>
          <ul style="color: #374151; line-height: 1.8; margin: 0; padding-left: 20px;">
            <li>Weekly FIRE tips and strategies</li>
            <li>Early access to new calculators and tools</li>
            <li>Real case studies and success stories</li>
            <li>Updates on market conditions affecting FIRE plans</li>
          </ul>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            Questions? Just reply to this email - we read every message!<br>
            FIRE Calculator Team
          </p>
        </div>

      </div>
    `;

    // Send welcome email
    const emailResult = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@resend.dev',
      to: [email],
      subject: '🔥 Welcome! Your FIRE journey starts now',
      html: welcomeEmailHtml,
    });

    if (emailResult.error) {
      console.error('Error sending welcome email:', emailResult.error);
      // Still return success since we saved the email
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed! Check your email for a welcome message.' 
    });

  } catch (error) {
    console.error('Email collection API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}