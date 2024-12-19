import type { APIRoute } from 'astro';

const MAILERLITE_API_KEY = import.meta.env.PUBLIC_MAILERLITE_API_KEY;

if (!MAILERLITE_API_KEY) {
  throw new Error('MAILERLITE_API_KEY environment variable is not set');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({
        error: 'Email is required'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    console.log('Attempting to subscribe:', email);

    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`
      },
      body: JSON.stringify({
        email: email,
        resubscribe: true,
        fields: {},
        groups: [],
        status: 'active'
      })
    });

    const data = await response.json();
    console.log('MailerLite API response:', data);

    if (!response.ok) {
      console.error('MailerLite API error:', data);
      return new Response(JSON.stringify({
        error: data.message || 'Failed to subscribe',
        details: data
      }), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    return new Response(JSON.stringify({
      message: 'Successfully subscribed!'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
