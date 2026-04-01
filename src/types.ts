/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserType = 'student' | 'graduate' | 'alumni' | 'club_member' | 'org_rep' | 'admin';
export type InstitutionType = 'university' | 'college' | 'institute';
export type OrganizationType = 'club' | 'career_center' | 'training_center' | 'business';

export interface Institution {
  id: string;
  name: string;
  city: string;
  type: InstitutionType;
  faculties: Faculty[];
}

export interface Faculty {
  id: string;
  name: string;
  departments: string[];
}

export interface StudentProfile {
  name: string;
  userType: UserType;
  city: string;
  institutionId: string;
  facultyId?: string;
  department?: string;
  stage?: string;
  interests: string[];
}

export type FeedCategory = 
  | 'announcements' 
  | 'university_news' 
  | 'faculty_news' 
  | 'events' 
  | 'clubs' 
  | 'internships' 
  | 'jobs' 
  | 'scholarships' 
  | 'courses' 
  | 'workshops' 
  | 'career_center' 
  | 'academic_resources' 
  | 'study_materials' 
  | 'discussions' 
  | 'lost_found' 
  | 'housing' 
  | 'roommates' 
  | 'transport' 
  | 'services' 
  | 'food' 
  | 'discounts' 
  | 'marketplace' 
  | 'student_services' 
  | 'mental_health' 
  | 'volunteer' 
  | 'competitions' 
  | 'research' 
  | 'alumni';

export type PostContentType = 
  | 'official_university' 
  | 'verified_department' 
  | 'student_club' 
  | 'student_community' 
  | 'alumni_graduate' 
  | 'business_service' 
  | 'sponsored';

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    isVerified?: boolean;
  };
  content: string;
  timestamp: Date;
  category: FeedCategory;
  contentType: PostContentType;
  likes: number;
  comments: number;
  image?: string;
  tags: string[];
  isSponsored?: boolean;
}

export type LocalServiceCategory = 
  | 'cafe' 
  | 'restaurant' 
  | 'printing' 
  | 'library' 
  | 'bookstore' 
  | 'stationery' 
  | 'transport' 
  | 'housing_service' 
  | 'tutoring' 
  | 'gym' 
  | 'clinic' 
  | 'pharmacy' 
  | 'business';

export interface LocalService {
  id: string;
  name: string;
  category: LocalServiceCategory;
  city: string;
  address: string;
  rating: number;
  distance?: string;
  image?: string;
  studentDiscount?: string;
  tags: string[];
}

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  city: string;
  institutionId?: string; // If associated with a specific campus
  description: string;
  category: string;
}
