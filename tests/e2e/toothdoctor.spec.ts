import { test, expect } from '@playwright/test';

test.describe('ToothDoctor Application', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('http://localhost:4002');
    
    // Check that the homepage loads
    await expect(page.locator('text=ToothDoctor')).toBeVisible();
    await expect(page.locator('text=Your Smile is Our Priority')).toBeVisible();
    
    // Check navigation links
    await expect(page.locator('text=About')).toBeVisible();
    await expect(page.locator('text=Services')).toBeVisible();
    await expect(page.locator('text=Our Doctors')).toBeVisible();
    await expect(page.locator('text=Contact')).toBeVisible();
  });

  test('services page displays dental services', async ({ page }) => {
    await page.goto('http://localhost:4002/services');
    
    await expect(page.locator('text=Our Services')).toBeVisible();
    await expect(page.locator('text=General Checkup')).toBeVisible();
    await expect(page.locator('text=Teeth Cleaning')).toBeVisible();
  });

  test('doctors page displays doctor profiles', async ({ page }) => {
    await page.goto('http://localhost:4002/doctors');
    
    await expect(page.locator('text=Our Expert Team')).toBeVisible();
    await expect(page.locator('text=Dr. Sarah Johnson')).toBeVisible();
  });

  test('contact page displays contact information', async ({ page }) => {
    await page.goto('http://localhost:4002/contact');
    
    await expect(page.locator('text=Contact Us')).toBeVisible();
    await expect(page.locator('text=Phone')).toBeVisible();
    await expect(page.locator('text=Email')).toBeVisible();
  });

  test('patient can login and access dashboard', async ({ page }) => {
    await page.goto('http://localhost:4002/auth/login');
    
    // Fill in login form
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('input[name="password"]', 'patient123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for redirect to dashboard
    await page.waitForURL('**/patient/dashboard');
    
    // Check that dashboard loaded
    await expect(page.locator('text=Patient Dashboard')).toBeVisible();
    await expect(page.locator('text=Welcome back')).toBeVisible();
  });

  test('doctor can login and access dashboard', async ({ page }) => {
    await page.goto('http://localhost:4002/auth/login');
    
    // Fill in login form
    await page.fill('input[name="email"]', 'sarah.johnson@toothdoctor.com');
    await page.fill('input[name="password"]', 'doctor123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for redirect to dashboard
    await page.waitForURL('**/doctor/dashboard');
    
    // Check that dashboard loaded
    await expect(page.locator('text=Doctor Dashboard')).toBeVisible();
  });

  test('admin can login and access dashboard', async ({ page }) => {
    await page.goto('http://localhost:4002/auth/login');
    
    // Fill in login form
    await page.fill('input[name="email"]', 'admin@toothdoctor.com');
    await page.fill('input[name="password"]', 'admin123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for redirect to dashboard
    await page.waitForURL('**/admin/dashboard');
    
    // Check that dashboard loaded
    await expect(page.locator('text=Admin Dashboard')).toBeVisible();
  });

  test('patient can book an appointment', async ({ page }) => {
    // Login as patient
    await page.goto('http://localhost:4002/auth/login');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('input[name="password"]', 'patient123');
    await page.click('button[type="submit"]');
    
    // Wait for dashboard
    await page.waitForURL('**/patient/dashboard');
    
    // Navigate to book appointment
    await page.click('text=Book Appointment');
    
    // Fill in appointment form
    await page.selectOption('select[name="doctorId"]', { index: 1 });
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    await page.fill('input[name="appointmentDate"]', dateString);
    
    await page.selectOption('select[name="startTime"]', '10:00');
    await page.fill('textarea[name="reasonForVisit"]', 'Regular checkup');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check for success message or redirect
    await page.waitForURL('**/patient/dashboard', { timeout: 5000 });
  });
});
