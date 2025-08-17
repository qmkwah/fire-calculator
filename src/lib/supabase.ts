import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Debug logging for Supabase configuration
console.log('=== SUPABASE CONFIG CHECK ===');
console.log('URL exists:', !!supabaseUrl);
console.log('Key exists:', !!supabaseKey);
console.log('URL value:', supabaseUrl);
console.log('Key first 20 chars:', supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'MISSING');

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for our database
export interface EmailLead {
  id?: number;
  email: string;
  source: string;
  calculator_type?: string;
  calculator_results?: Record<string, unknown>;
  current_age?: number;
  current_savings?: number;
  retirement_age?: number;
  desired_income?: number;
  created_at?: string;
  updated_at?: string;
}

// Function to save email lead
export async function saveEmailLead(data: Omit<EmailLead, 'id' | 'created_at' | 'updated_at'>) {
  try {
    console.log('=== SAVING EMAIL LEAD ===');
    console.log('Email:', data.email);
    console.log('Source:', data.source);
    console.log('Calculator type:', data.calculator_type);
    console.log('Calculator results:', data.calculator_results);
    console.log('Full data object:', JSON.stringify(data, null, 2));

    const { data: result, error } = await supabase
      .from('email_leads')
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error('=== SUPABASE INSERT ERROR ===');
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      console.error('Error hint:', error.hint);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      throw error;
    }

    console.log('=== SUPABASE INSERT SUCCESS ===');
    console.log('Inserted data:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('=== SAVE EMAIL LEAD FUNCTION ERROR ===');
    console.error('Caught error:', error);
    throw error;
  }
}

// Function to check if email already exists
export async function checkEmailExists(email: string) {
  try {
    console.log('=== CHECKING EMAIL EXISTS ===');
    console.log('Checking email:', email);

    const { data, error } = await supabase
      .from('email_leads')
      .select('id')
      .eq('email', email)
      .single();

    console.log('Query result - data:', data);
    console.log('Query result - error:', error);
    console.log('Error code (if any):', error?.code);

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('=== UNEXPECTED EMAIL CHECK ERROR ===');
      console.error('Error checking email:', error);
      throw error;
    }

    const exists = !!data;
    console.log('Email exists result:', exists);
    return exists; // Returns true if email exists
  } catch (error) {
    console.error('=== CHECK EMAIL EXISTS FUNCTION ERROR ===');
    console.error('Caught error:', error);
    return false; // Return false on error to be safe
  }
}

// Alternative function that matches the API route parameter structure
export async function saveEmailLeadSimple(email: string, source: string, calculatorData?: Record<string, unknown>) {
  const data: Omit<EmailLead, 'id' | 'created_at' | 'updated_at'> = {
    email,
    source,
    calculator_type: 'coast-fire',
    calculator_results: calculatorData
  };

  return await saveEmailLead(data);
}