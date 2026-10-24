import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../store/authStore';
import { saveComplaint, getStoredComplaints } from '../services/complaintService';
import { getWeatherConditionText, getAqiCategory } from '../services/api';
import { translations } from '../data/translations';

describe('Vellore Smart City Dashboard Core Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('handles demo citizen login and logout', () => {
    const { login, logout } = useAuthStore.getState();

    login('Citizen User', 'citizen@vellore.gov.in');
    const user = useAuthStore.getState().user;
    expect(user).not.toBeNull();
    expect(user?.name).toBe('Citizen User');
    expect(user?.citizenId).toMatch(/^VLR-/);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    logout();
    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it('persists and retrieves civic complaints in localStorage', () => {
    const newComplaint = saveComplaint({
      citizenName: 'Sample Resident',
      phone: '9876543210',
      ward: 'Ward 12 (Katpadi Station Road)',
      category: 'Street Lights',
      description: 'Street light repair near Katpadi junction.',
      urgency: 'Medium',
    });

    expect(newComplaint.trackingId).toMatch(/^VLR-GRV-2026-/);
    expect(newComplaint.status).toBe('Submitted');

    const stored = getStoredComplaints();
    const found = stored.find((c) => c.trackingId === newComplaint.trackingId);
    expect(found).toBeDefined();
    expect(found?.citizenName).toBe('Sample Resident');
  });

  it('maps weather WMO codes to human readable status', () => {
    expect(getWeatherConditionText(0)).toBe('Clear Sky');
    expect(getWeatherConditionText(1)).toBe('Mainly Clear');
    expect(getWeatherConditionText(61)).toBe('Rain Showers');
    expect(getWeatherConditionText(95)).toBe('Thunderstorm');
  });

  it('correctly categorizes AQI levels and provides health advisories', () => {
    const good = getAqiCategory(42);
    expect(good.label).toContain('Good');

    const moderate = getAqiCategory(85);
    expect(moderate.label).toContain('Moderate');

    const unhealthy = getAqiCategory(160);
    expect(unhealthy.label).toContain('Unhealthy');
  });

  it('contains complete English and Tamil translations for navigation', () => {
    expect(translations.en.nav.overview).toBe('Overview');
    expect(translations.ta.nav.overview).toBe('கண்ணோட்டம்');
    expect(translations.en.appName).toBe('Wonder Vellore');
    expect(translations.ta.appName).toBe('வொண்டர் வேலூர்');
  });
});
