
import React from 'react';
import { Home, Calculator, PlusSquare, User, LogIn } from 'lucide-react';
import { useStore } from '../store';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const { currentUser } = useStore();

  const navItemClass = (view: ViewState) => 
    `flex flex-col items-center justify-center w-full h-full space-y-1 ${
      currentView === view || (view === ViewState.PROFILE && currentView === ViewState.EDIT_PROFILE)
        ? 'text-primary' 
        : 'text-gray-400 hover:text-gray-200'
    }`;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-surface border-t border-slate-800 backdrop-blur-lg bg-opacity-95">
      <div className="grid h-full grid-cols-4 mx-auto max-w-lg"> {/* max-w-lg limits width on desktop */}
        <button className={navItemClass(ViewState.FEED)} onClick={() => onNavigate(ViewState.FEED)}>
          <Home size={24} strokeWidth={currentView === ViewState.FEED ? 2.5 : 2} />
        </button>

        <button className={navItemClass(ViewState.CALCULATOR)} onClick={() => onNavigate(ViewState.CALCULATOR)}>
          <Calculator size={24} strokeWidth={currentView === ViewState.CALCULATOR ? 2.5 : 2} />
        </button>

        <button 
          className={`${navItemClass(ViewState.CREATE)}`} 
          onClick={() => onNavigate(ViewState.CREATE)}
        >
          <PlusSquare size={26} strokeWidth={currentView === ViewState.CREATE ? 2.5 : 2} />
        </button>

        {currentUser ? (
          <button className={navItemClass(ViewState.PROFILE)} onClick={() => onNavigate(ViewState.PROFILE)}>
            <div className={`p-0.5 rounded-full border-2 ${currentView === ViewState.PROFILE ? 'border-primary' : 'border-transparent'}`}>
               <img 
                src={currentUser.avatar} 
                alt="Profile" 
                className="w-6 h-6 rounded-full object-cover" 
              />
            </div>
          </button>
        ) : (
          <button className={navItemClass(ViewState.LOGIN)} onClick={() => onNavigate(ViewState.LOGIN)}>
            <LogIn size={24} strokeWidth={currentView === ViewState.LOGIN ? 2.5 : 2} />
          </button>
        )}
      </div>
    </div>
  );
};
