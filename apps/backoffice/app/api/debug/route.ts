import { NextResponse } from 'next/server';
import { getDatabaseConfig } from '@backoffice/database';

/**
 * Debug API endpoint
 * GET /api/debug
 */
export async function GET() {
  try {
    const config = getDatabaseConfig();
    
    const debug = {
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_TYPE: process.env.DATABASE_TYPE,
        isServer: typeof window === 'undefined',
        cwd: process.cwd()
      },
      databaseConfig: config,
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(debug, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      {
        error: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 