
import { useEffect, useRef, useState } from "react";
import {
  BookOpenCheck,
  ChevronDown,
  CircleUserRound,
  FilePlus2,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelTop,
  UserRound,
  X,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

export default function Navbar({ subtitle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const profileRef = useRef(null);
  const mobileRef = useRef(null);
  const avatarButtonRef = useRef(null);
  const mobileButtonRef = useRef(null);

  const role = String(user?.role || "student").toLowerCase();
  const isTeacher = role === "teacher";

  const displayRole = isTeacher ? "Teacher" : "Student";
  const displayName = user?.name || "User";
  const displayEmail = user?.email || "";

  const initials = displayName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "U";

  const navigationItems = isTeacher
    ? [
        {
          label: "Dashboard",
          to: "/teacher",
          icon: LayoutDashboard,
          end: true,
        },
        {
          label: "Create Exam",
          to: "/teacher#create-exam-form",
          icon: FilePlus2,
          end: false,
        },
        {
          label: "Published Exams",
          to: "/teacher#published-exams",
          icon: PanelTop,
          end: false,
        },
      ]
    : [
        {
          label: "Dashboard",
          to: "/student",
          icon: LayoutDashboard,
          end: true,
        },
        {
          label: "My Results",
          to: "/student#results",
          icon: BookOpenCheck,
          end: false,
        },
      ];

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

      if (
        mobileRef.current &&
        !mobileRef.current.contains(event.target)
      ) {
        setMobileOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setMobileOpen(false);
        avatarButtonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setProfileOpen(false);
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  function handleLogout() {
    setProfileOpen(false);
    setMobileOpen(false);
    logout();
    navigate("/login", { replace: true });
  }

  function handleNavigationClick(item) {
    setMobileOpen(false);
    setProfileOpen(false);

    if (item.to.includes("#")) {
      const [path, hash] = item.to.split("#");

      if (location.pathname === path) {
        window.setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 0);
      }
    }
  }

  return (
    <header
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
    >
      <div className="navbar-inner">
        {/* Brand */}
        <NavLink
          to={isTeacher ? "/teacher" : "/student"}
          className="navbar-brand"
          aria-label="ExamFlow home"
        >
          <span className="navbar-brand-icon">
            <BookOpenCheck size={25} strokeWidth={2.2} />
          </span>

          <span className="navbar-brand-text">
            <strong>ExamFlow</strong>
            <span>{subtitle || `${displayRole} workspace`}</span>
          </span>
        </NavLink>

        {/* Desktop navigation */}
        <nav
          className="navbar-navigation"
          aria-label="Main navigation"
        >
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                onClick={() => handleNavigationClick(item)}
                className={({ isActive }) =>
                  `navbar-nav-link ${
                    isActive ? "navbar-nav-link-active" : ""
                  }`
                }
              >
                <Icon size={17} strokeWidth={2} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop profile and logout */}
        <div className="navbar-actions">
          <div className="navbar-profile-wrapper" ref={profileRef}>
            <button
              ref={avatarButtonRef}
              type="button"
              className={`navbar-profile-trigger ${
                profileOpen ? "profile-trigger-open" : ""
              }`}
              onClick={() => {
                setProfileOpen((previous) => !previous);
                setMobileOpen(false);
              }}
              aria-label="Open profile menu"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              <span
                className={`navbar-avatar ${
                  isTeacher ? "avatar-teacher" : "avatar-student"
                }`}
              >
                {initials}
              </span>

              <span className="navbar-profile-name">
                {displayName}
              </span>

              <span
                className={`navbar-role-badge ${
                  isTeacher ? "role-teacher" : "role-student"
                }`}
              >
                {displayRole}
              </span>

              <ChevronDown
                className={`navbar-chevron ${
                  profileOpen ? "navbar-chevron-open" : ""
                }`}
                size={15}
              />
            </button>

            {profileOpen && (
              <div className="navbar-profile-dropdown" role="menu">
                <div className="profile-dropdown-header">
                  <span
                    className={`navbar-avatar dropdown-avatar ${
                      isTeacher ? "avatar-teacher" : "avatar-student"
                    }`}
                  >
                    {initials}
                  </span>

                  <div className="profile-dropdown-identity">
                    <strong>{displayName}</strong>
                    <span>{displayEmail || "No email available"}</span>
                  </div>
                </div>

                <div className="profile-dropdown-divider" />

                <div className="profile-dropdown-role">
                  <span>Account type</span>
                  <span
                    className={`navbar-role-badge ${
                      isTeacher ? "role-teacher" : "role-student"
                    }`}
                  >
                    {displayRole}
                  </span>
                </div>

                <div className="profile-dropdown-divider" />

                <button
                  type="button"
                  className="profile-dropdown-logout"
                  role="menuitem"
                  onClick={handleLogout}
                >
                  <LogOut size={17} />
                  <span>Sign out of ExamFlow</span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="navbar-logout"
            onClick={handleLogout}
            aria-label="Log out of ExamFlow"
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="navbar-mobile-wrapper" ref={mobileRef}>
          <button
            ref={mobileButtonRef}
            type="button"
            className="navbar-mobile-toggle"
            onClick={() => {
              setMobileOpen((previous) => !previous);
              setProfileOpen(false);
            }}
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            aria-controls="navbar-mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {mobileOpen && (
            <div
              className="navbar-mobile-menu"
              id="navbar-mobile-menu"
            >
              <div className="mobile-menu-user">
                <span
                  className={`navbar-avatar ${
                    isTeacher ? "avatar-teacher" : "avatar-student"
                  }`}
                >
                  {initials}
                </span>

                <div>
                  <strong>{displayName}</strong>
                  <span>{displayEmail}</span>
                </div>
              </div>

              <div className="mobile-menu-divider" />

              <nav aria-label="Mobile navigation">
                {navigationItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.label}
                      to={item.to}
                      end={item.end}
                      onClick={() => handleNavigationClick(item)}
                      className={({ isActive }) =>
                        `mobile-nav-link ${
                          isActive ? "mobile-nav-link-active" : ""
                        }`
                      }
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>

              <div className="mobile-menu-divider" />

              <div className="mobile-menu-footer">
                <span
                  className={`navbar-role-badge ${
                    isTeacher ? "role-teacher" : "role-student"
                  }`}
                >
                  {displayRole} account
                </span>

                <button
                  type="button"
                  className="mobile-menu-logout"
                  onClick={handleLogout}
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
