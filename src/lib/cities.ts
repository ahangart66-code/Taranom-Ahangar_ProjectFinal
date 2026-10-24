const CITY_FA: Record<string, string> = {
  Tehran: 'تهران',
  Sananndaj: 'سنندج',
  Madrid: 'مادرید',
  Isfahan: 'اصفهان',
  Sulaymaniyah: 'سلیمانیه',
  Hewler: 'اربیل',
  Mazandaran: 'مازندران',
  Gilan: 'گیلان',
  Italy: 'ایتالیا',
};

export const CITY_OPTIONS = [
  { id: '1', name: 'Tehran', label: 'تهران' },
  { id: '2', name: 'Sananndaj', label: 'سنندج' },
  { id: '3', name: 'Madrid', label: 'مادرید' },
  { id: '4', name: 'Isfahan', label: 'اصفهان' },
  { id: '5', name: 'Sulaymaniyah', label: 'سلیمانیه' },
  { id: '6', name: 'Hewler', label: 'اربیل' },
  { id: '7', name: 'Mazandaran', label: 'مازندران' },
  { id: '8', name: 'Gilan', label: 'گیلان' },
  { id: '9', name: 'Italy', label: 'ایتالیا' },
] as const;

export function cityLabel(name?: string): string {
  if (!name) return '—';
  return CITY_FA[name] || name;
}

const FLEET_FA: Record<string, string> = {
  bus: 'اتوبوس',
  van: 'ون',
  suv: 'شاسی‌بلند',
  airplane: 'هواپیما',
  ship: 'کشتی',
};

export function fleetLabel(vehicle?: string): string {
  if (!vehicle) return 'وسیله نقلیه';
  return FLEET_FA[vehicle.toLowerCase()] || vehicle;
}
