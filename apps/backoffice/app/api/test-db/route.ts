import { NextResponse } from 'next/server';

/**
 * Test database connection endpoint
 * GET /api/test-db
 */
export async function GET() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test better-sqlite3 import
    const Database = require('better-sqlite3');
    console.log('✅ better-sqlite3 imported successfully');
    
    // Test database path
    const dbPath = '/Users/anonymous/Workspace/backoffice/backoffice/apps/backoffice/data/backoffice.db';
    console.log('📍 Database path:', dbPath);
    
    // Test database connection
    const db = new Database(dbPath);
    console.log('✅ Database connection created');
    
    // Test simple query
    const result = db.prepare('SELECT 1 as test').get();
    console.log('✅ Test query executed:', result);
    
    db.close();
    console.log('✅ Database connection closed');
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection test passed',
      result: result,
      dbPath: dbPath
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Database connection test failed:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        message: 'Database connection test failed',
        error: errorMessage,
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 