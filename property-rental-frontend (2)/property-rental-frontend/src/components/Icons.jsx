const Icon = ({ d, size = 16, stroke = 'currentColor', fill = 'none', strokeWidth = 2, children, viewBox = '0 0 24 24', ...props }) => (
  <svg width={size} height={size} viewBox={viewBox} fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', flexShrink: 0 }} {...props}>
    {d ? <path d={d} /> : children}
  </svg>
);

export const HeartIcon = ({ filled, size, color, ...p }) => (
  <Icon size={size} stroke={color || (filled ? 'none' : 'currentColor')} fill={filled ? (color || '#e05252') : 'none'} {...p}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </Icon>
);

export const DashboardIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </Icon>
);

export const PlusIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </Icon>
);

export const BoltIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </Icon>
);

export const CameraIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </Icon>
);

export const CheckIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <polyline points="20 6 9 17 4 12"/>
  </Icon>
);

export const CheckCircleIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </Icon>
);

export const MailIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </Icon>
);

export const PhoneIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </Icon>
);

export const MapPinIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </Icon>
);

export const PartyIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M5.8 11.3L2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/>
    <path d="M22 2l-7.5 7.5"/><path d="M13.5 8.5L8 14"/>
  </Icon>
);

export const EditIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </Icon>
);

export const TrashIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </Icon>
);

export const SaveIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
  </Icon>
);

export const SparkleIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M12 3c-1 2.5-2.5 4-5 5 2.5 1 4 2.5 5 5 1-2.5 2.5-4 5-5-2.5-1-4-2.5-5-5z"/>
    <path d="M5 3c-.5 1.5-1.5 2.5-3 3 1.5.5 2.5 1.5 3 3 .5-1.5 1.5-2.5 3-3-1.5-.5-2.5-1.5-3-3z"/>
  </Icon>
);

export const UsersIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </Icon>
);

export const HomeIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </Icon>
);

export const CalendarIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </Icon>
);

export const DollarIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </Icon>
);

export const BeachIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M17.5 8a4.5 4.5 0 1 0-9 0c0 2.5 4.5 11 4.5 11S17.5 10.5 17.5 8z"/>
    <line x1="3" y1="22" x2="21" y2="22"/>
  </Icon>
);

export const LuggageIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <rect x="6" y="7" width="12" height="14" rx="2"/><path d="M9 7V5a2 2 0 0 1 4 0v2"/>
    <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
  </Icon>
);

export const CreditCardIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </Icon>
);

export const StarIcon = ({ filled, size, ...p }) => (
  <Icon size={size} fill={filled ? '#FFB800' : 'none'} stroke={filled ? '#FFB800' : 'currentColor'} {...p}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </Icon>
);

export const BedIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>
  </Icon>
);

export const BathIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M9 6L6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>
    <line x1="3" y1="13" x2="21" y2="13"/>
  </Icon>
);

export const WifiIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/>
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>
  </Icon>
);

export const CarIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <rect x="1" y="3" width="15" height="13" rx="2"/>
    <path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </Icon>
);

export const PoolIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M2 12h20"/><path d="M2 17c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/>
    <path d="M2 7c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/>
  </Icon>
);

export const SunriseIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/>
    <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/>
    <line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/>
    <line x1="23" y1="22" x2="1" y2="22"/><polyline points="8 6 12 2 16 6"/>
  </Icon>
);

export const BarChartIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </Icon>
);

export const WaveIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M7 11.5C8.5 9 10 8 12 8s3.5 1 5 3.5"/>
    <path d="M2 17c1.5-2 3-3 5-3s3.5 1 5 3 3.5 3 5 3"/>
  </Icon>
);

export const LogOutIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </Icon>
);

export const DiamondIcon = ({ size, ...p }) => (
  <Icon size={size} {...p}>
    <polygon points="12 2 19 8.5 12 22 5 8.5 12 2"/>
    <line x1="5" y1="8.5" x2="19" y2="8.5"/>
  </Icon>
);
