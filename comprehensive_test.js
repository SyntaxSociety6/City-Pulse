const fetch = require('node-fetch');

const API_BASE = 'http://localhost:4000';

async function comprehensiveTest() {
    console.log('🚀 Starting Comprehensive CityPulse System Test...\n');
    
    const testResults = {
        backend: {},
        database: {},
        api: {},
        sse: {},
        overall: 'PASSED'
    };
    
    try {
        // Test 1: Backend Server Health
        console.log('1. 🔍 Testing Backend Server Health...');
        try {
            const healthResponse = await fetch(`${API_BASE}/health`);
            const healthData = await healthResponse.json();
            
            if (healthResponse.ok && healthData.ok) {
                testResults.backend.health = 'PASSED';
                console.log('   ✅ Backend server is healthy');
            } else {
                testResults.backend.health = 'FAILED';
                console.log('   ❌ Backend server health check failed');
                testResults.overall = 'FAILED';
            }
        } catch (error) {
            testResults.backend.health = 'FAILED';
            console.log('   ❌ Backend server connection failed:', error.message);
            testResults.overall = 'FAILED';
        }
        
        // Test 2: Database Connection
        console.log('\n2. 🗄️ Testing Database Connection...');
        try {
            const stateResponse = await fetch(`${API_BASE}/state`);
            const stateData = await stateResponse.json();
            
            if (stateResponse.ok && stateData.hasOwnProperty('projects') && 
                stateData.hasOwnProperty('alerts') && 
                stateData.hasOwnProperty('reports') && 
                stateData.hasOwnProperty('congestion')) {
                testResults.database.connection = 'PASSED';
                console.log('   ✅ Database connection successful');
                console.log(`   📊 Current data: ${stateData.projects.length} projects, ${stateData.alerts.length} alerts, ${stateData.reports.length} reports, ${stateData.congestion.length} congestion`);
            } else {
                testResults.database.connection = 'FAILED';
                console.log('   ❌ Database connection failed');
                testResults.overall = 'FAILED';
            }
        } catch (error) {
            testResults.database.connection = 'FAILED';
            console.log('   ❌ Database connection error:', error.message);
            testResults.overall = 'FAILED';
        }
        
        // Test 3: API Endpoints
        console.log('\n3. 🔌 Testing API Endpoints...');
        
        // Test POST /reports
        try {
            const testReport = {
                kind: 'comprehensive_test',
                description: 'Comprehensive test report',
                location: { lat: 28.6139, lng: 77.2090 },
                reporterId: 'comprehensive_test_user',
                contact: 'test@comprehensive.com'
            };
            
            const reportResponse = await fetch(`${API_BASE}/reports`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(testReport)
            });
            
            if (reportResponse.ok) {
                const reportData = await reportResponse.json();
                testResults.api.createReport = 'PASSED';
                console.log('   ✅ POST /reports - Report created successfully');
                console.log(`   📝 Report ID: ${reportData._id}`);
            } else {
                testResults.api.createReport = 'FAILED';
                console.log('   ❌ POST /reports - Failed to create report');
                testResults.overall = 'FAILED';
            }
        } catch (error) {
            testResults.api.createReport = 'FAILED';
            console.log('   ❌ POST /reports - Error:', error.message);
            testResults.overall = 'FAILED';
        }
        
        // Test GET /reports
        try {
            const reportsResponse = await fetch(`${API_BASE}/reports`);
            if (reportsResponse.ok) {
                const reportsData = await reportsResponse.json();
                testResults.api.getReports = 'PASSED';
                console.log(`   ✅ GET /reports - Retrieved ${reportsData.length} reports`);
            } else {
                testResults.api.getReports = 'FAILED';
                console.log('   ❌ GET /reports - Failed to retrieve reports');
                testResults.overall = 'FAILED';
            }
        } catch (error) {
            testResults.api.getReports = 'FAILED';
            console.log('   ❌ GET /reports - Error:', error.message);
            testResults.overall = 'FAILED';
        }
        
        // Test POST /projects
        try {
            const testProject = {
                name: 'Comprehensive Test Project',
                description: 'A test project for comprehensive testing',
                category: 'test',
                status: 'planned',
                location: { lat: 28.6139, lng: 77.2090 },
                startedAt: new Date(),
                expectedCompletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            };
            
            const projectResponse = await fetch(`${API_BASE}/projects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(testProject)
            });
            
            if (projectResponse.ok) {
                const projectData = await projectResponse.json();
                testResults.api.createProject = 'PASSED';
                console.log('   ✅ POST /projects - Project created successfully');
                console.log(`   🏗️ Project ID: ${projectData._id}`);
            } else {
                testResults.api.createProject = 'FAILED';
                console.log('   ❌ POST /projects - Failed to create project');
                testResults.overall = 'FAILED';
            }
        } catch (error) {
            testResults.api.createProject = 'FAILED';
            console.log('   ❌ POST /projects - Error:', error.message);
            testResults.overall = 'FAILED';
        }
        
        // Test 4: Final State Verification
        console.log('\n4. 🔍 Final State Verification...');
        try {
            const finalStateResponse = await fetch(`${API_BASE}/state`);
            const finalStateData = await finalStateResponse.json();
            
            if (finalStateResponse.ok) {
                testResults.database.finalState = 'PASSED';
                console.log('   ✅ Final state retrieved successfully');
                console.log(`   📊 Final counts:`);
                console.log(`      - Projects: ${finalStateData.projects.length}`);
                console.log(`      - Alerts: ${finalStateData.alerts.length}`);
                console.log(`      - Reports: ${finalStateData.reports.length}`);
                console.log(`      - Congestion: ${finalStateData.congestion.length}`);
            } else {
                testResults.database.finalState = 'FAILED';
                console.log('   ❌ Failed to retrieve final state');
                testResults.overall = 'FAILED';
            }
        } catch (error) {
            testResults.database.finalState = 'FAILED';
            console.log('   ❌ Final state error:', error.message);
            testResults.overall = 'FAILED';
        }
        
        // Test 5: SSE Endpoint (Basic)
        console.log('\n5. 📡 Testing SSE Endpoint...');
        try {
            const sseResponse = await fetch(`${API_BASE}/events`);
            if (sseResponse.ok) {
                testResults.sse.endpoint = 'PASSED';
                console.log('   ✅ SSE endpoint accessible');
            } else {
                testResults.sse.endpoint = 'FAILED';
                console.log('   ❌ SSE endpoint not accessible');
                testResults.overall = 'FAILED';
            }
        } catch (error) {
            testResults.sse.endpoint = 'FAILED';
            console.log('   ❌ SSE endpoint error:', error.message);
            testResults.overall = 'FAILED';
        }
        
        // Test 6: Seed Demo Data
        console.log('\n6. 🌱 Testing Demo Data Seeding...');
        try {
            const seedResponse = await fetch(`${API_BASE}/seed/demo`, { method: 'POST' });
            if (seedResponse.ok) {
                const seedData = await seedResponse.json();
                testResults.api.seedDemo = 'PASSED';
                console.log('   ✅ Demo data seeded successfully');
                console.log(`   📊 Seeded: ${seedData.projects?.length || 0} projects, ${seedData.alerts?.length || 0} alerts, ${seedData.congestion?.length || 0} congestion`);
            } else {
                testResults.api.seedDemo = 'FAILED';
                console.log('   ❌ Failed to seed demo data');
                testResults.overall = 'FAILED';
            }
        } catch (error) {
            testResults.api.seedDemo = 'FAILED';
            console.log('   ❌ Demo data seeding error:', error.message);
            testResults.overall = 'FAILED';
        }
        
        // Final Summary
        console.log('\n' + '='.repeat(60));
        console.log('📋 COMPREHENSIVE TEST RESULTS');
        console.log('='.repeat(60));
        
        console.log(`\n🏗️ Backend Tests:`);
        console.log(`   Health Check: ${testResults.backend.health || 'NOT TESTED'}`);
        
        console.log(`\n🗄️ Database Tests:`);
        console.log(`   Connection: ${testResults.database.connection || 'NOT TESTED'}`);
        console.log(`   Final State: ${testResults.database.finalState || 'NOT TESTED'}`);
        
        console.log(`\n🔌 API Tests:`);
        console.log(`   Create Report: ${testResults.api.createReport || 'NOT TESTED'}`);
        console.log(`   Get Reports: ${testResults.api.getReports || 'NOT TESTED'}`);
        console.log(`   Create Project: ${testResults.api.createProject || 'NOT TESTED'}`);
        console.log(`   Seed Demo: ${testResults.api.seedDemo || 'NOT TESTED'}`);
        
        console.log(`\n📡 SSE Tests:`);
        console.log(`   Endpoint: ${testResults.sse.endpoint || 'NOT TESTED'}`);
        
        console.log(`\n🎯 OVERALL RESULT: ${testResults.overall}`);
        
        if (testResults.overall === 'PASSED') {
            console.log('\n🎉 All tests passed! Your CityPulse system is working correctly.');
            console.log('\n🚀 Next steps:');
            console.log('   1. Open UI/Main.html in your browser');
            console.log('   2. Navigate to UI/index.html for the dashboard');
            console.log('   3. Use UI/1.html for the interactive map');
            console.log('   4. Test issue reporting by clicking on the map');
        } else {
            console.log('\n⚠️ Some tests failed. Please check the errors above.');
            console.log('\n🔧 Troubleshooting:');
            console.log('   1. Ensure the Maps server is running on port 4000');
            console.log('   2. Check MongoDB connection string');
            console.log('   3. Verify all dependencies are installed');
        }
        
    } catch (error) {
        console.error('\n💥 Test execution failed:', error.message);
        console.error('Stack trace:', error.stack);
        testResults.overall = 'FAILED';
    }
}

// Run the comprehensive test
comprehensiveTest();
