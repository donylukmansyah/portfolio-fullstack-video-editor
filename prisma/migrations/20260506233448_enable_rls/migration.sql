-- Enable Row Level Security on all public tables to fix Supabase security advisor warnings

ALTER TABLE "public"."verification" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."account" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."MainCategory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."SubCategory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."ContactMessage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."PortfolioItem" ENABLE ROW LEVEL SECURITY;