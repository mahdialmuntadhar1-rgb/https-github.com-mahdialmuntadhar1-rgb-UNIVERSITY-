/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  MapPin, 
  Search, 
  Bell, 
  User, 
  Home, 
  Briefcase, 
  Users, 
  Calendar,
  ChevronRight,
  BookOpen,
  Building2,
  Sparkles,
  LogOut,
  Plus,
  Megaphone,
  Newspaper,
  Award,
  PlayCircle,
  Cpu,
  Target,
  Book,
  FileText,
  MessageSquare,
  HelpCircle,
  UserPlus,
  Truck,
  Coffee,
  Tag,
  ShoppingBag,
  Heart,
  Activity,
  Hand,
  Trophy,
  Microscope,
  Star,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Share2,
  CheckCircle,
  Store,
  Layout,
  Palette,
  ShieldCheck,
  Zap,
  Coffee as CoffeeIcon,
  Globe
} from 'lucide-react';
import { cn } from './lib/utils';
import { IRAQ_CITIES, INSTITUTIONS, ORGANIZATIONS, STAGES, INTERESTS, FEED_CATEGORIES, LOCAL_SERVICES } from './constants';
import { StudentProfile, FeedCategory, Post, UserType, Organization, LocalService } from './types';
import { formatDistanceToNow } from 'date-fns';

// --- Mock Data ---
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: { id: 'uob', name: 'University of Baghdad', role: 'official', isVerified: true },
    content: 'Official Announcement: The final examination schedule for the first semester has been released. Please check your faculty notice boards or the official website for details.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    category: 'announcements',
    contentType: 'official_university',
    likes: 124,
    comments: 45,
    tags: ['Registration', 'Spring2026']
  },
  {
    id: '2',
    author: { id: 'career-hub', name: 'Tech Career Hub', role: 'career_center', isVerified: true },
    content: 'We are looking for 5 interns from the Computer Engineering department for our summer program in Baghdad.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    category: 'internships',
    contentType: 'business_service',
    likes: 89,
    comments: 12,
    image: 'https://picsum.photos/seed/office/800/400',
    tags: ['Internship', 'Tech', 'Baghdad']
  },
  {
    id: '3',
    author: { id: 'ahmed', name: 'Ahmed Al-Saadi', role: 'student' },
    content: 'Does anyone have the notes for the Advanced Algorithms lecture from last Tuesday?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    category: 'study_materials',
    contentType: 'student_community',
    likes: 15,
    comments: 8,
    tags: ['Algorithms', 'Help']
  },
  {
    id: '4',
    author: { id: 'alumni-assoc', name: 'UoB Alumni Association', role: 'alumni', isVerified: true },
    content: 'Join us for the annual networking dinner next month. Great opportunity for new graduates!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    category: 'alumni',
    contentType: 'alumni_graduate',
    likes: 230,
    comments: 56,
    tags: ['Networking', 'Alumni']
  },
  {
    id: '5',
    author: { id: 'gdg', name: 'GDG Baghdad', role: 'club', isVerified: true },
    content: 'Join us for our upcoming Flutter workshop this Saturday! Learn how to build cross-platform apps from scratch.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    category: 'workshops',
    contentType: 'student_club',
    likes: 89,
    comments: 12,
    tags: ['Flutter', 'Development', 'GDG']
  },
  {
    id: '6',
    author: { id: 'local-cafe', name: 'Campus Coffee', role: 'business' },
    content: 'New student discount! Show your ID and get 20% off all lattes this week.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1),
    category: 'discounts',
    contentType: 'sponsored',
    isSponsored: true,
    likes: 45,
    comments: 5,
    tags: ['Coffee', 'Discount'],
    image: 'https://picsum.photos/seed/coffee/800/400'
  },
  {
    id: '7',
    author: { id: 'marketplace-user', name: 'Sara Mohammed', role: 'student' },
    content: 'Selling my TI-84 Plus graphing calculator. Perfect condition, used for one semester. DM if interested!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    category: 'marketplace',
    contentType: 'student_community',
    likes: 12,
    comments: 3,
    image: 'https://picsum.photos/seed/calc/800/400',
    tags: ['Calculator', 'Engineering']
  },
  {
    id: '8',
    author: { id: 'housing-agent', name: 'Al-Jadriya Housing', role: 'business', isVerified: true },
    content: 'New student rooms available in Jadriya, 5 mins walk from UoB main gate. Fully furnished with high-speed internet.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    category: 'housing',
    contentType: 'business_service',
    likes: 45,
    comments: 18,
    tags: ['Housing', 'Dorms']
  }
];

// --- Components ---

const Onboarding = ({ onComplete }: { onComplete: (profile: StudentProfile) => void }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Partial<StudentProfile>>({
    userType: 'student',
    interests: []
  });

  const steps = [
    { 
      title: 'Who are you?', 
      field: 'userType', 
      options: [
        { id: 'student', name: 'Current Student' },
        { id: 'graduate', name: 'Graduate' },
        { id: 'alumni', name: 'Alumni' },
        { id: 'club_member', name: 'Student Club Member' },
        { id: 'org_rep', name: 'Organization Representative' },
        { id: 'admin', name: 'University Page Admin (Verified)' }
      ] 
    },
    { title: 'Where are you?', field: 'city', options: IRAQ_CITIES },
    { 
      title: 'Your Institution', 
      field: 'institutionId', 
      options: INSTITUTIONS.filter(u => u.city === profile.city).map(u => ({ id: u.id, name: u.name }))
    },
    { 
      title: 'Your Faculty', 
      field: 'facultyId', 
      options: INSTITUTIONS.find(u => u.id === profile.institutionId)?.faculties.map(f => ({ id: f.id, name: f.name })) || []
    },
    { 
      title: 'Department', 
      field: 'department', 
      options: INSTITUTIONS.find(u => u.id === profile.institutionId)?.faculties.find(f => f.id === profile.facultyId)?.departments || []
    },
    {
      title: 'Current Stage',
      field: 'stage',
      options: STAGES
    },
    {
      title: 'Your Interests',
      field: 'interests',
      options: INTERESTS
    }
  ];

  const isStudentOrAlumni = ['student', 'graduate', 'alumni', 'club_member'].includes(profile.userType || '');

  const handleSelect = (value: string) => {
    const currentField = steps[step].field;
    
    if (currentField === 'interests') {
      const currentInterests = profile.interests || [];
      const newInterests = currentInterests.includes(value)
        ? currentInterests.filter(i => i !== value)
        : [...currentInterests, value];
      setProfile(prev => ({ ...prev, interests: newInterests }));
      return;
    }

    const nextProfile = { ...profile, [currentField]: value };
    setProfile(nextProfile);

    let nextStep = step + 1;
    
    // Logic to skip steps based on user type
    if (!isStudentOrAlumni && step === 2) {
      setStep(6); // Go to interests
      return;
    }

    if (nextStep < steps.length) {
      setStep(nextStep);
    }
  };

  const handleFinish = () => {
    onComplete(profile as StudentProfile);
  };

  const currentStep = steps[step];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <motion.div 
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white mb-4">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Al-Jami'a</h1>
          <p className="text-slate-500">Your digital campus in Iraq</p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">{currentStep.title}</h2>
            <span className="text-sm text-slate-400">Step {step + 1} of {steps.length}</span>
          </div>

          <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
            {currentStep.options.map((opt: any) => {
              const id = typeof opt === 'string' ? opt : opt.id;
              const name = typeof opt === 'string' ? opt : opt.name;
              const isSelected = currentStep.field === 'interests' && profile.interests?.includes(id);

              return (
                <button
                  key={id}
                  onClick={() => handleSelect(id)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-all text-left group",
                    isSelected 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-slate-200 hover:border-blue-500 hover:bg-blue-50/50"
                  )}
                >
                  <span className={cn(
                    "font-medium",
                    isSelected ? "text-blue-700" : "text-slate-700"
                  )}>{name}</span>
                  {currentStep.field === 'interests' ? (
                    <div className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                      isSelected ? "bg-blue-500 border-blue-500" : "border-slate-300"
                    )}>
                      {isSelected && <Plus size={14} className="text-white rotate-45" />}
                    </div>
                  ) : (
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {currentStep.field === 'interests' && (
            <button 
              onClick={handleFinish}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
            >
              Finish Registration
            </button>
          )}

          {step > 0 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="text-sm text-slate-400 hover:text-slate-600 transition-colors text-center"
            >
              Go back
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const category = FEED_CATEGORIES.find(c => c.id === post.category);
  
  const getContentTypeConfig = (type: string) => {
    switch (type) {
      case 'official_university': 
        return { 
          label: 'Official University', 
          color: 'text-blue-600 bg-blue-50 border-blue-100',
          icon: Building2,
          borderColor: 'border-l-4 border-l-blue-600'
        };
      case 'verified_department': 
        return { 
          label: 'Verified Faculty', 
          color: 'text-sky-600 bg-sky-50 border-sky-100',
          icon: CheckCircle,
          borderColor: 'border-l-4 border-l-sky-500'
        };
      case 'student_club': 
        return { 
          label: 'Student Club', 
          color: 'text-pink-600 bg-pink-50 border-pink-100',
          icon: Users,
          borderColor: 'border-l-4 border-l-pink-500'
        };
      case 'alumni_graduate': 
        return { 
          label: 'Alumni', 
          color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
          icon: GraduationCap,
          borderColor: 'border-l-4 border-l-indigo-500'
        };
      case 'business_service': 
        return { 
          label: 'Local Business', 
          color: 'text-orange-600 bg-orange-50 border-orange-100',
          icon: Store,
          borderColor: 'border-l-4 border-l-orange-500'
        };
      case 'sponsored': 
        return { 
          label: 'Promoted', 
          color: 'text-amber-600 bg-amber-50 border-amber-100',
          icon: Sparkles,
          borderColor: 'border-l-4 border-l-amber-500',
          cardBg: 'bg-amber-50/30'
        };
      default: 
        return { 
          label: 'Student Community', 
          color: 'text-slate-500 bg-slate-50 border-slate-100',
          icon: User,
          borderColor: ''
        };
    }
  };

  const config = getContentTypeConfig(post.contentType);
  const Icon = config.icon;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "glass-card rounded-2xl p-4 space-y-4 relative overflow-hidden",
        config.borderColor,
        config.cardBg
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            post.contentType === 'official_university' ? "bg-blue-600" :
            post.contentType === 'verified_department' ? "bg-sky-500" :
            post.contentType === 'student_club' ? "bg-pink-500" :
            post.contentType === 'alumni_graduate' ? "bg-indigo-500" :
            post.contentType === 'business_service' ? "bg-orange-500" :
            post.contentType === 'sponsored' ? "bg-amber-500" : "bg-slate-400"
          )}>
            <Icon size={20} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-semibold text-slate-900 text-sm">{post.author.name}</h4>
              {post.author.isVerified && (
                <CheckCircle size={14} className="text-blue-500 fill-blue-50" />
              )}
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider">
              <span className={cn("px-1.5 py-0.5 rounded border", config.color)}>
                {config.label}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400 font-medium lowercase tracking-normal">
                {formatDistanceToNow(post.timestamp)} ago
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
          {category?.name || post.category}
        </div>
      </div>

      <p className="text-slate-700 text-sm leading-relaxed">
        {post.content}
      </p>

      {post.image && (
        <img 
          src={post.image} 
          alt="Post content" 
          className="rounded-xl w-full h-48 object-cover"
          referrerPolicy="no-referrer"
        />
      )}

      <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
        <button className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors">
          <ThumbsUp size={16} />
          <span className="text-xs font-medium">{post.likes}</span>
        </button>
        <button className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors">
          <MessageCircle size={16} />
          <span className="text-xs font-medium">{post.comments}</span>
        </button>
        <button className="ml-auto text-slate-400 hover:text-blue-600 transition-colors">
          <Share2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const Dashboard = ({ profile }: { profile: StudentProfile }) => {
  const [activeTab, setActiveTab] = useState<FeedCategory>('announcements');
  const [view, setView] = useState<'home' | 'hubs' | 'nearby' | 'strategy' | 'profile' | 'marketplace'>('home');
  const [theme, setTheme] = useState<'youth' | 'campus' | 'clean' | 'premium'>('clean');
  const [searchQuery, setSearchQuery] = useState('');
  const institution = INSTITUTIONS.find(u => u.id === profile.institutionId);

  const getThemeStyles = () => {
    switch (theme) {
      case 'youth': return 'theme-youth';
      case 'campus': return 'theme-campus';
      case 'premium': return 'theme-premium';
      default: return 'theme-clean';
    }
  };

  const filteredPosts = MOCK_POSTS.filter(p => {
    const matchesTab = p.category === activeTab;
    const matchesSearch = p.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const renderHome = () => (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search campus news, events, jobs..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
        />
      </div>

      {/* Welcome Card */}
      <section className="student-id-gradient rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="space-y-1">
            <p className="text-blue-200 text-xs font-medium uppercase tracking-widest">
              {profile.userType.replace('_', ' ')} Identity
            </p>
            <h2 className="text-2xl font-bold">{profile.name || 'User Name'}</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-blue-300 text-[10px] uppercase">Institution</p>
              <p className="font-medium truncate">{institution?.name}</p>
            </div>
            {profile.facultyId && (
              <div>
                <p className="text-blue-300 text-[10px] uppercase">Faculty</p>
                <p className="font-medium truncate">{institution?.faculties.find(f => f.id === profile.facultyId)?.name}</p>
              </div>
            )}
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 opacity-10 rotate-12">
          <GraduationCap size={160} />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-4 gap-2">
        {[
          { icon: Megaphone, label: 'Announcements', color: 'bg-red-500', tab: 'announcements' },
          { icon: Calendar, label: 'Events', color: 'bg-orange-500', tab: 'events' },
          { icon: Users, label: 'Clubs', color: 'bg-pink-500', tab: 'clubs' },
          { icon: Briefcase, label: 'Jobs', color: 'bg-indigo-500', tab: 'jobs' },
        ].map((item, i) => (
          <button 
            key={i} 
            onClick={() => {
              setActiveTab(item.tab as FeedCategory);
              const element = document.getElementById(`tab-${item.tab}`);
              if (element) element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }}
            className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-all"
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", item.color)}>
              <item.icon size={20} />
            </div>
            <span className="text-[10px] font-semibold text-slate-600 uppercase text-center leading-tight">{item.label}</span>
          </button>
        ))}
      </section>

      {/* Feed Tabs */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-6 px-6">
          {FEED_CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as FeedCategory)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2",
                activeTab === tab.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                  : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
              )}
            >
              <span className="opacity-70">
                {tab.name}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 space-y-2"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                  <Sparkles size={32} />
                </div>
                <p className="text-slate-400 font-medium">No updates in this category yet</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );

  const renderMarketplace = () => {
    const marketplaceItems = MOCK_POSTS.filter(p => {
      const isMarketplace = p.category === 'marketplace';
      const matchesSearch = p.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      return isMarketplace && matchesSearch;
    });

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Student Marketplace</h2>
          <p className="text-slate-500 text-sm">Buy, sell, or exchange with fellow students safely.</p>
        </div>
        
        {/* Search Bar (Shared state with Home) */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search books, electronics, housing..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {marketplaceItems.length > 0 ? (
            marketplaceItems.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                {item.image && (
                  <img src={item.image} alt="Marketplace item" className="w-full h-32 object-cover" referrerPolicy="no-referrer" />
                )}
                <div className="p-3 space-y-2">
                  <p className="text-xs font-medium text-slate-900 line-clamp-2">{item.content}</p>
                  <div className="flex items-center gap-2">
                    <img src={item.author.avatar} alt="" className="w-4 h-4 rounded-full" referrerPolicy="no-referrer" />
                    <span className="text-[10px] text-slate-500">{item.author.name}</span>
                  </div>
                  <button className="w-full py-1.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-lg hover:bg-blue-100 transition-colors">
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 text-slate-400">
              <p>No items found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderHubs = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Campus Hubs</h2>
        <p className="text-slate-500 text-sm">Discover clubs, organizations, and training centers.</p>
      </div>
      
      <div className="grid gap-4">
        {ORGANIZATIONS.map(org => (
          <div key={org.id} className="glass-card rounded-2xl p-4 flex gap-4 items-start">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0",
              org.type === 'club' ? "bg-pink-500" : 
              org.type === 'career_center' ? "bg-purple-500" : "bg-orange-500"
            )}>
              {org.type === 'club' ? <Users size={24} /> : <Building2 size={24} />}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900">{org.name}</h3>
                <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded uppercase font-bold">
                  {org.type.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2">{org.description}</p>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs text-blue-600 font-medium">{org.category}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-400">{org.city}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Career Center</h2>
        <p className="text-slate-500 text-sm">Opportunities tailored for {institution?.name} students.</p>
      </div>

      <div className="space-y-4">
        {MOCK_POSTS.filter(p => p.category === 'internships' || p.category === 'jobs').map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );

  const renderNearby = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Nearby Discovery</h2>
        <p className="text-slate-500 text-sm">Student-friendly services and businesses in {profile.city}.</p>
      </div>

      <div className="grid gap-4">
        {LOCAL_SERVICES.filter(s => s.city === profile.city).map(service => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            {service.image && (
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-32 object-cover"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">{service.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin size={12} /> {service.address} • {service.distance}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                  <Star size={10} fill="currentColor" /> {service.rating}
                </div>
              </div>

              {service.studentDiscount && (
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl text-xs font-semibold">
                  <Tag size={14} />
                  {service.studentDiscount}
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                {service.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderStrategy = () => (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">Product Strategy</h2>
        <p className="text-slate-500">Al-Jami'a: Iraq's Digital Campus Ecosystem</p>
      </div>

      <div className="grid gap-6">
        <section className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2 text-blue-600">
            <Palette size={20} /> Branding Directions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'youth', name: 'Youth Energetic', icon: Zap, color: 'bg-orange-500' },
              { id: 'campus', name: 'Campus Warm', icon: CoffeeIcon, color: 'bg-emerald-500' },
              { id: 'clean', name: 'Clean Academy', icon: ShieldCheck, color: 'bg-blue-600' },
              { id: 'premium', name: 'Premium City', icon: Globe, color: 'bg-slate-900' },
            ].map(t => (
              <button 
                key={t.id}
                onClick={() => setTheme(t.id as any)}
                className={cn(
                  "p-4 rounded-2xl border-2 transition-all text-left space-y-2",
                  theme === t.id ? "border-blue-600 bg-blue-50" : "border-slate-100 bg-white hover:border-slate-200"
                )}
              >
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white", t.color)}>
                  <t.icon size={18} />
                </div>
                <span className="text-xs font-bold block">{t.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="glass-card rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
            <ShieldCheck size={20} className="text-emerald-500" /> Trust & Moderation
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>Verified badges for official university pages and trusted organizations.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>AI-assisted content moderation to prevent harassment and scams.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>Clear separation between official academic news and community social noise.</span>
            </li>
          </ul>
        </section>

        <section className="glass-card rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
            <Zap size={20} className="text-orange-500" /> Sustainability Model
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: 'Verified Business Listings', desc: 'Subscription for student-friendly businesses.' },
              { label: 'Promoted Opportunities', desc: 'Featured internships and training programs.' },
              { label: 'Student Discount Partnerships', desc: 'Exclusive deals for Al-Jami\'a users.' },
            ].map((m, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-bold text-slate-900">{m.label}</p>
                <p className="text-[10px] text-slate-500">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <div className={cn("min-h-screen pb-24 transition-colors duration-500", getThemeStyles(), theme === 'premium' ? 'bg-slate-950' : 'bg-slate-50')}>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <GraduationCap size={18} />
            </div>
            <h1 className="font-bold text-lg text-slate-900">Al-Jami'a</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('strategy')}
              className={cn("p-2 rounded-full transition-colors", view === 'strategy' ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:bg-slate-100")}
              title="Product Strategy"
            >
              <Layout size={20} />
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div 
              onClick={() => setView('profile')}
              className={cn("w-8 h-8 rounded-full border overflow-hidden cursor-pointer transition-all", view === 'profile' ? "ring-2 ring-blue-500 border-white" : "border-slate-300")}
            >
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        {view === 'home' && renderHome()}
        {view === 'hubs' && renderHubs()}
        {view === 'nearby' && renderNearby()}
        {view === 'marketplace' && renderMarketplace()}
        {view === 'strategy' && renderStrategy()}
        {view === 'profile' && (
          <div className="space-y-8 py-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-900">{profile.name}</h2>
                <p className="text-slate-500 font-medium">{institution?.name}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {profile.userType.replace('_', ' ')}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {profile.stage}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-2xl text-center">
                <p className="text-2xl font-bold text-slate-900">12</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Posts</p>
              </div>
              <div className="glass-card p-4 rounded-2xl text-center">
                <p className="text-2xl font-bold text-slate-900">450</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Followers</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider px-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map(interestId => {
                  const interest = INTERESTS.find(i => i.id === interestId);
                  return (
                    <span key={interestId} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-600">
                      {interest?.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 px-8 py-3 z-40">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => setView('home')}
            className={cn("flex flex-col items-center gap-1", view === 'home' ? "text-blue-600" : "text-slate-400")}
          >
            <Home size={24} />
            <span className="text-[10px] font-bold uppercase">Home</span>
          </button>
          <button 
            onClick={() => setView('hubs')}
            className={cn("flex flex-col items-center gap-1", view === 'hubs' ? "text-blue-600" : "text-slate-400")}
          >
            <Users size={24} />
            <span className="text-[10px] font-bold uppercase">Hubs</span>
          </button>
          <div className="relative -top-6">
            <button className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-200 border-4 border-white">
              <Plus size={28} />
            </button>
          </div>
          <button 
            onClick={() => setView('marketplace')}
            className={cn("flex flex-col items-center gap-1", view === 'marketplace' ? "text-blue-600" : "text-slate-400")}
          >
            <Store size={24} />
            <span className="text-[10px] font-bold uppercase">Shop</span>
          </button>
          <button 
            onClick={() => setView('nearby')}
            className={cn("flex flex-col items-center gap-1", view === 'nearby' ? "text-blue-600" : "text-slate-400")}
          >
            <MapPin size={24} />
            <span className="text-[10px] font-bold uppercase">Nearby</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default function App() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('al_jamia_profile');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const handleOnboardingComplete = (newProfile: StudentProfile) => {
    const fullProfile = { ...newProfile, name: 'Student' }; // Default name for demo
    setProfile(fullProfile);
    localStorage.setItem('al_jamia_profile', JSON.stringify(fullProfile));
  };

  const handleLogout = () => {
    localStorage.removeItem('al_jamia_profile');
    setProfile(null);
  };

  if (loading) return null;

  return (
    <div className="font-sans">
      {!profile ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <Dashboard profile={profile} />
      )}
      
      {profile && (
        <button 
          onClick={handleLogout}
          className="fixed top-4 right-4 z-50 p-2 bg-white/50 hover:bg-white rounded-full text-slate-400 hover:text-red-500 transition-all"
          title="Logout"
        >
          <LogOut size={16} />
        </button>
      )}
    </div>
  );
}
