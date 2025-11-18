'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, User, Search, Menu, LogOut, X, Heart, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuthStore, useCartStore } from '@/lib/store';
import { useTheme } from '@/components/theme-provider';
import { useEffect, useState } from 'react';
import { t } from '@/lib/translations';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { cart, fetchCart } = useCartStore();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const handleLogout = () => {
    logout();
    router.push('/');
    setMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const cartItemCount = cart?.totalItems || 0;

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4 md:gap-10">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Link href="/" className="flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              Dyqan Online
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link
              href="/products"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/products' ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {t('nav.products')}
            </Link>
            <Link
              href="/categories"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/categories' ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {t('nav.categories')}
            </Link>
            {user?.isAdmin && (
              <Link
                href="/admin"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname?.startsWith('/admin') ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {t('nav.admin')}
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Search Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="transition-transform hover:scale-110"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {isAuthenticated && (
            <Link href="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
          )}

          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">{t('nav.register')}</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="border-t">
          <div className="container py-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="search"
                placeholder={t('nav.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button type="submit">{t('common.search')}</Button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t md:hidden">
          <nav className="container flex flex-col space-y-4 py-4">
            <Link
              href="/products"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.products')}
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.categories')}
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href="/wishlist"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.wishlist')}
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.dashboard')}
                </Link>
                {user?.isAdmin && (
                  <Link
                    href="/admin"
                    className="text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav.admin')}
                  </Link>
                )}
                <Button variant="outline" onClick={handleLogout} className="justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('nav.logout')}
                </Button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">{t('nav.register')}</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
