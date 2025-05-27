/**
 * Authentication and User Management Types
 * 
 * This module contains all type definitions related to user authentication,
 * user profiles, and authorization for the 4X trading platform.
 */

/**
 * User role enumeration defining access levels and permissions
 */
export enum UserRole {
  /** Standard user with basic trading features */
  USER = 'USER',
  /** Premium user with advanced features and analytics */
  PREMIUM = 'PREMIUM',
  /** Administrator with full platform access */
  ADMIN = 'ADMIN',
}

/**
 * User account status enumeration
 */
export enum AccountStatus {
  /** Account is active and can trade */
  ACTIVE = 'ACTIVE',
  /** Account is suspended temporarily */
  SUSPENDED = 'SUSPENDED',
  /** Account is pending email verification */
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  /** Account is permanently disabled */
  DISABLED = 'DISABLED',
}

/**
 * Two-factor authentication method types
 */
export enum TwoFactorMethod {
  /** SMS-based 2FA */
  SMS = 'SMS',
  /** Authenticator app-based 2FA */
  TOTP = 'TOTP',
  /** Email-based 2FA */
  EMAIL = 'EMAIL',
}

/**
 * Complete user profile interface
 */
export interface User {
  /** Unique user identifier */
  id: string
  /** User's email address (also used for login) */
  email: string
  /** User's display name */
  name: string
  /** User's first name */
  firstName?: string
  /** User's last name */
  lastName?: string
  /** URL to user's profile avatar image */
  avatar?: string
  /** User's role determining access level */
  role: UserRole
  /** Current account status */
  status: AccountStatus
  /** Whether the user has premium subscription */
  premiumStatus: boolean
  /** Premium subscription expiry date */
  premiumExpiresAt?: Date
  /** Whether email is verified */
  emailVerified: boolean
  /** Whether 2FA is enabled */
  twoFactorEnabled: boolean
  /** 2FA method if enabled */
  twoFactorMethod?: TwoFactorMethod
  /** User's phone number for SMS 2FA */
  phoneNumber?: string
  /** User's preferred timezone */
  timezone: string
  /** User's preferred language/locale */
  locale: string
  /** User's preferred currency for display */
  preferredCurrency: string
  /** Whether user has accepted latest terms */
  termsAccepted: boolean
  /** Date when terms were accepted */
  termsAcceptedAt?: Date
  /** Account creation timestamp */
  createdAt: Date
  /** Last profile update timestamp */
  updatedAt: Date
  /** Last login timestamp */
  lastLoginAt?: Date
  /** Last seen timestamp */
  lastSeenAt?: Date
  /** Number of failed login attempts */
  failedLoginAttempts: number
  /** When account will be unlocked after failed attempts */
  lockedUntil?: Date
  /** User's account type */
  accountType: AccountType
  /** Whether user has verified email */
  isEmailVerified: boolean
  /** Whether user has verified phone */
  isPhoneVerified: boolean
  /** User preferences */
  preferences: UserPreferences
}

/**
 * Login credentials interface for authentication
 */
export interface LoginCredentials {
  /** User's email address */
  email: string
  /** User's password */
  password: string
  /** Remember user session for extended period */
  rememberMe?: boolean
  /** 2FA code if 2FA is enabled */
  twoFactorCode?: string
}

/**
 * Registration data interface for new user signup
 */
export interface RegisterData {
  /** User's email address */
  email: string
  /** User's chosen password */
  password: string
  /** Password confirmation */
  confirmPassword: string
  /** User's display name */
  name: string
  /** User's first name */
  firstName?: string
  /** User's last name */
  lastName?: string
  /** User's phone number */
  phoneNumber?: string
  /** User's preferred timezone */
  timezone?: string
  /** User's preferred locale */
  locale?: string
  /** User's preferred currency */
  preferredCurrency?: string
  /** Agreement to terms of service */
  agreeToTerms: boolean
  /** Agreement to privacy policy */
  agreeToPrivacy: boolean
  /** Opt-in for marketing emails */
  agreeToMarketing?: boolean
  /** Referral code if referred by another user */
  referralCode?: string
}

/**
 * Authentication state interface for state management
 */
export interface AuthState {
  /** Currently authenticated user */
  user: User | null
  /** Whether user is currently authenticated */
  isAuthenticated: boolean
  /** Whether authentication is being checked */
  isLoading: boolean
  /** Authentication error if any */
  error: string | null
  /** JWT access token */
  accessToken: string | null
  /** JWT refresh token */
  refreshToken: string | null
  /** Token expiration timestamp */
  tokenExpiresAt: Date | null
  /** Whether remember me is enabled */
  rememberMe: boolean
  /** Last activity timestamp for session management */
  lastActivity: Date | null
}

/**
 * Authentication response interface from API
 */
export interface AuthResponse {
  /** Authentication success status */
  success: boolean
  /** Success or error message */
  message: string
  /** User data if authentication successful */
  user?: User
  /** JWT access token */
  accessToken?: string
  /** JWT refresh token */
  refreshToken?: string
  /** Token expiration timestamp */
  expiresAt?: Date
  /** Whether 2FA is required */
  requiresTwoFactor?: boolean
  /** Session information */
  session?: SessionInfo
}

/**
 * JWT token payload interface
 */
export interface JWTPayload {
  /** User ID */
  sub: string
  /** User email */
  email: string
  /** User role */
  role: UserRole
  /** Token type (access or refresh) */
  type: 'access' | 'refresh'
  /** Token issued at timestamp */
  iat: number
  /** Token expiration timestamp */
  exp: number
  /** Token issuer */
  iss: string
  /** Token audience */
  aud: string
  /** Session ID for token revocation */
  sessionId: string
}

/**
 * Password reset request interface
 */
export interface PasswordResetRequest {
  /** User's email address */
  email: string
}

/**
 * Password reset confirmation interface
 */
export interface PasswordResetConfirm {
  /** Reset token from email */
  token: string
  /** New password */
  password: string
  /** Password confirmation */
  confirmPassword: string
}

/**
 * Change password interface for authenticated users
 */
export interface ChangePassword {
  /** Current password */
  currentPassword: string
  /** New password */
  newPassword: string
  /** New password confirmation */
  confirmPassword: string
}

/**
 * Profile update interface
 */
export interface ProfileUpdate {
  /** Updated display name */
  name?: string
  /** Updated first name */
  firstName?: string
  /** Updated last name */
  lastName?: string
  /** Updated phone number */
  phoneNumber?: string
  /** Updated timezone */
  timezone?: string
  /** Updated locale */
  locale?: string
  /** Updated preferred currency */
  preferredCurrency?: string
}

/**
 * 2FA setup interface
 */
export interface TwoFactorSetup {
  /** 2FA method to enable */
  method: TwoFactorMethod
  /** Phone number for SMS 2FA */
  phoneNumber?: string
  /** TOTP secret for authenticator apps */
  totpSecret?: string
  /** Verification code */
  verificationCode: string
}

/**
 * Session information interface
 */
export interface SessionInfo {
  /** Session ID */
  id: string
  /** User agent string */
  userAgent: string
  /** IP address */
  ipAddress: string
  /** Geolocation information */
  location?: string
  /** Device type */
  deviceType: 'desktop' | 'mobile' | 'tablet'
  /** Browser name */
  browser?: string
  /** Operating system */
  os?: string
  /** Whether this is the current session */
  isCurrent: boolean
  /** Session creation timestamp */
  createdAt: Date
  /** Last activity timestamp */
  lastActivity: Date
  /** Session expiration timestamp */
  expiresAt: Date
}

/**
 * User preferences interface
 */
export interface UserPreferences {
  /** Theme preference */
  theme: 'light' | 'dark'
  /** Notification preferences */
  notifications: {
    /** Email notifications enabled */
    email: boolean
    /** Push notifications enabled */
    push: boolean
    /** SMS notifications enabled */
    sms: boolean
    /** Price alert notifications */
    priceAlerts: boolean
    /** News notifications */
    news: boolean
    /** System notifications */
    system: boolean
  }
  /** Trading preferences */
  trading: {
    /** Default leverage */
    defaultLeverage: number
    /** Confirmation for trades */
    confirmTrades: boolean
    /** Auto-close positions */
    autoClose: boolean
  }
  /** Dashboard preferences */
  dashboard: {
    /** Default chart interval */
    defaultChartInterval: string
    /** Widgets configuration */
    widgets: string[]
    /** Layout configuration */
    layout: 'grid' | 'list'
  }
  /** Language preference */
  language: string
  /** Timezone preference */
  timezone: string
  /** Currency preference */
  currency: string
}

/**
 * User account type enumeration
 */
export enum AccountType {
  /** Demo account */
  DEMO = 'DEMO',
  /** Basic account */
  BASIC = 'BASIC',
  /** Pro account */
  PRO = 'PRO',
  /** Enterprise account */
  ENTERPRISE = 'ENTERPRISE',
}

/**
 * Reset password data interface
 */
export interface ResetPasswordData {
  /** User's email address */
  email: string
  /** Reset token from email */
  token: string
  /** New password */
  newPassword: string
} 