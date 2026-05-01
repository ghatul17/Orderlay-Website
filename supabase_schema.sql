-- 1. Create Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'restaurant_owner',
  restaurant_name TEXT, -- Used for referrers
  trial_started_at TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Referral Codes Table
CREATE TABLE referral_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Referrals Table
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  referee_id UUID REFERENCES users(id) ON DELETE CASCADE,
  code_id UUID REFERENCES referral_codes(id) ON DELETE SET NULL,
  status TEXT NOT NULL CHECK (status IN ('trial', 'active', 'expired')),
  signup_way TEXT NOT NULL CHECK (signup_way IN ('referrer_filled', 'self_filled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Commissions Table
CREATE TABLE commissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referral_id UUID REFERENCES referrals(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add some basic Row Level Security (RLS) policies (Optional but recommended)
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
