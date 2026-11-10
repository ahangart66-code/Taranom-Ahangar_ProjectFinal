// date to Y-M-D
export function toApiDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Y-M-D to date
export function parseIsoDate(iso?: string): Date | null {
  if (!iso) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
}

export function formatDateTime(iso?: string): string {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatTourDate(iso?: string): string {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

// e.g. ۵ روز و ۴ شب
export function tourStayLabel(startIso?: string, endIso?: string): string {
  if (!startIso || !endIso) return '—';
  const start = new Date(startIso);
  const end = new Date(endIso);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return '—';

  const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1);
  const nights = Math.max(0, days - 1);
  return `${days.toLocaleString('fa-IR')} روز و ${nights.toLocaleString('fa-IR')} شب`;
}

// e.g. مهر ماه . ۳ روزه - اتوبوس
export function tourCardMeta(startIso?: string, endIso?: string, fleet?: string): string {
  if (!startIso) return '—';
  const start = new Date(startIso);
  if (Number.isNaN(start.getTime())) return '—';

  const end = endIso ? new Date(endIso) : start;
  const endTime = Number.isNaN(end.getTime()) ? start.getTime() : end.getTime();
  const days = Math.max(1, Math.round((endTime - start.getTime()) / 86_400_000) + 1);
  const month = new Intl.DateTimeFormat('fa-IR', { month: 'long' }).format(start);

  return `${month} ماه . ${days.toLocaleString('fa-IR')} روزه - ${fleet || 'حمل‌ونقل'}`;
}
