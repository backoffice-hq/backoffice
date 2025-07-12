import { NextResponse } from 'next/server';
import { getStartupStatus, isDatabaseReady, isApplicationReady, ensureApplicationInitialized } from '@/lib/startup';

/**
 * Health check API endpoint
 * GET /api/health
 */
export async function GET() {
  try {
    // Try to initialize application if not already initialized
    await ensureApplicationInitialized();
    
    const startupStatus = getStartupStatus();
    const isReady = isApplicationReady();
    const isDatabaseOk = isDatabaseReady();

    const health = {
      status: isReady ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      application: {
        name: 'Back Office',
        version: '0.0.1',
        initialized: startupStatus.isInitialized,
        startupTime: startupStatus.startupTime,
        ready: isReady
      },
      database: {
        connected: startupStatus.database.connected,
        initialized: startupStatus.database.initialized,
        seeded: startupStatus.database.seeded,
        ready: isDatabaseOk
      },
      errors: startupStatus.errors
    };

    // Return 200 if healthy, 503 if unhealthy
    const statusCode = isReady ? 200 : 503;
    
    return NextResponse.json(health, { status: statusCode });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: errorMessage,
        application: {
          name: 'Back Office',
          version: '0.0.1',
          initialized: false,
          ready: false
        },
        database: {
          connected: false,
          initialized: false,
          seeded: false,
          ready: false
        }
      },
      { status: 500 }
    );
  }
} 