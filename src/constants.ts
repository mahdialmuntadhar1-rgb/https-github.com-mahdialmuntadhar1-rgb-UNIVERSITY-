import { Institution, Organization, LocalService } from './types';

export const IRAQ_CITIES = [
  'Baghdad', 'Basra', 'Mosul', 'Erbil', 'Najaf', 'Karbala', 'Sulaymaniyah', 'Duhok', 'Kirkuk', 'Anbar'
];

export const INSTITUTIONS: Institution[] = [
  {
    id: 'uob',
    name: 'University of Baghdad',
    city: 'Baghdad',
    type: 'university',
    faculties: [
      {
        id: 'eng',
        name: 'College of Engineering',
        departments: ['Computer Engineering', 'Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering']
      },
      {
        id: 'med',
        name: 'College of Medicine',
        departments: ['General Medicine', 'Dentistry', 'Pharmacy']
      }
    ]
  },
  {
    id: 'ictu',
    name: 'Iraqi University for IT & Communications',
    city: 'Baghdad',
    type: 'university',
    faculties: [
      {
        id: 'it',
        name: 'College of Business Informatics',
        departments: ['Business IT', 'E-Governance']
      }
    ]
  },
  {
    id: 'tech-inst-baghdad',
    name: 'Technical Institute - Baghdad',
    city: 'Baghdad',
    type: 'institute',
    faculties: [
      {
        id: 'admin',
        name: 'Administrative Techniques',
        departments: ['Accounting', 'Management']
      }
    ]
  }
];

export const STAGES = [
  '1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', 'Postgraduate', 'Graduate/Alumni'
];

export const INTERESTS = [
  { id: 'announcements', name: 'Official Announcements', icon: 'Megaphone' },
  { id: 'university_news', name: 'University News', icon: 'Newspaper' },
  { id: 'faculty_news', name: 'Faculty / Department News', icon: 'GraduationCap' },
  { id: 'events', name: 'Events', icon: 'Calendar' },
  { id: 'clubs', name: 'Student Clubs', icon: 'Users' },
  { id: 'internships', name: 'Internships', icon: 'Briefcase' },
  { id: 'jobs', name: 'Jobs', icon: 'Search' },
  { id: 'scholarships', name: 'Scholarships', icon: 'Award' },
  { id: 'courses', name: 'Training Courses', icon: 'PlayCircle' },
  { id: 'workshops', name: 'Workshops', icon: 'Cpu' },
  { id: 'career_center', name: 'Career Center', icon: 'Target' },
  { id: 'academic_resources', name: 'Academic Resources', icon: 'Book' },
  { id: 'study_materials', name: 'Notes / Study Materials', icon: 'FileText' },
  { id: 'discussions', name: 'Questions & Discussions', icon: 'MessageSquare' },
  { id: 'lost_found', name: 'Lost & Found', icon: 'HelpCircle' },
  { id: 'housing', name: 'Housing / Dorms', icon: 'Home' },
  { id: 'roommates', name: 'Roommates', icon: 'UserPlus' },
  { id: 'transport', name: 'Transport', icon: 'Truck' },
  { id: 'services', name: 'Nearby Services', icon: 'MapPin' },
  { id: 'food', name: 'Nearby Food / Cafés', icon: 'Coffee' },
  { id: 'discounts', name: 'Student Discounts', icon: 'Tag' },
  { id: 'marketplace', name: 'Marketplace', icon: 'ShoppingBag' },
  { id: 'student_services', name: 'Student Services', icon: 'Heart' },
  { id: 'mental_health', name: 'Mental Health / Support', icon: 'Activity' },
  { id: 'volunteer', name: 'Volunteer Opportunities', icon: 'Hand' },
  { id: 'competitions', name: 'Competitions', icon: 'Trophy' },
  { id: 'research', name: 'Research Opportunities', icon: 'Microscope' },
  { id: 'alumni', name: 'Graduate / Alumni Opportunities', icon: 'Star' }
];

export const FEED_CATEGORIES = INTERESTS; // They share the same structure for now

export const ORGANIZATIONS: Organization[] = [
  {
    id: 'google-dev-group',
    name: 'Google Developer Group Baghdad',
    type: 'club',
    city: 'Baghdad',
    description: 'A community for developers interested in Google technologies.',
    category: 'Technology'
  },
  {
    id: 'iraq-career-center',
    name: 'Iraq Career Center',
    type: 'career_center',
    city: 'Baghdad',
    description: 'Helping students and graduates find their dream jobs.',
    category: 'Career'
  },
  {
    id: 'zain-iq',
    name: 'Zain Iraq',
    type: 'business',
    city: 'Baghdad',
    description: 'Leading telecommunications provider in Iraq.',
    category: 'Telecommunications'
  }
];

export const LOCAL_SERVICES: LocalService[] = [
  {
    id: 'cafe-1',
    name: 'The Study Corner Café',
    category: 'cafe',
    city: 'Baghdad',
    address: 'Near University of Baghdad, Jadriya',
    rating: 4.8,
    distance: '0.5 km',
    image: 'https://picsum.photos/seed/cafe1/400/300',
    studentDiscount: '15% off on all beverages',
    tags: ['Quiet', 'Fast WiFi', 'Student Favorite']
  },
  {
    id: 'print-1',
    name: 'QuickPrint Solutions',
    category: 'printing',
    city: 'Baghdad',
    address: 'Main Gate, University of Baghdad',
    rating: 4.5,
    distance: '0.2 km',
    image: 'https://picsum.photos/seed/print1/400/300',
    studentDiscount: '10% off for bulk printing',
    tags: ['Fast', 'Color Printing', 'Binding']
  },
  {
    id: 'book-1',
    name: 'Al-Mutanabbi Bookstore',
    category: 'bookstore',
    city: 'Baghdad',
    address: 'Al-Mutanabbi Street',
    rating: 4.9,
    distance: '3.5 km',
    image: 'https://picsum.photos/seed/books1/400/300',
    tags: ['Rare Books', 'Academic', 'Cultural Hub']
  },
  {
    id: 'gym-1',
    name: 'Campus Fitness Center',
    category: 'gym',
    city: 'Baghdad',
    address: 'Jadriya, near UoB Stadium',
    rating: 4.2,
    distance: '0.8 km',
    image: 'https://picsum.photos/seed/gym1/400/300',
    studentDiscount: 'Special monthly student rate',
    tags: ['Modern Equipment', 'Personal Training']
  },
  {
    id: 'pharmacy-1',
    name: 'Al-Amal Pharmacy',
    category: 'pharmacy',
    city: 'Baghdad',
    address: 'Jadriya Main Road',
    rating: 4.6,
    distance: '0.4 km',
    image: 'https://picsum.photos/seed/pharmacy1/400/300',
    tags: ['24/7', 'Student Health Insurance Accepted']
  }
];
