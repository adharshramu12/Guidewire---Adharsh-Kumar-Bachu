import mongoose from 'mongoose';
import connectDB from '../config/database.js';
import Worker from '../models/worker.model.js';
import Policy from '../models/policy.model.js';
import { RIDERS } from '../services/riderSimulator.js';

const seedDatabase = async () => {
  await connectDB();

  try {
    // Clear existing data
    await Worker.deleteMany({});
    await Policy.deleteMany({});
    console.log('[Seed] 🧹 Database cleaned');

    // Insert Workers from RiderSimulator registry
    const workers = await Worker.insertMany(RIDERS.map(r => ({
      id: r.id,
      name: r.name,
      phone: r.phone,
      platform: r.platform,
      city: r.city,
      zoneId: r.zoneId,
      gigScore: r.gigScore,
      upiId: `${r.name.toLowerCase().replace(' ', '.')}.gig@upi`,
      coverageActive: r.coverageActive
    })));

    console.log(`[Seed] 👤 Inserted ${workers.length} workers across AP zones`);

    // Create active policies for all workers
    const policies = await Policy.insertMany(workers.map(w => ({
      id: `POL-${w.id.split('-')[1]}-SEED`,
      worker_id: w.id,
      plan_type: 'standard',
      weekly_premium: 29,
      coverage_start: new Date(),
      coverage_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })));

    console.log(`[Seed] 🛡️ Generated ${policies.length} active covers`);
    console.log('[Seed] ✅ Database seeding complete. Ready for v5.0 Demo.');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed] ❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
