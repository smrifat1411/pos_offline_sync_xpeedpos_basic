import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useAuth } from 'renderer/context/AuthContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

/**
 * Sign-in screen.
 *
 * This is the first thing anyone sees, including on a fresh install where the
 * database has no users in it at all. The link to registration used to be
 * commented out and the only other route to it sits behind the auth guard, so a
 * new install had no way to create its first account - the screen was a dead
 * end. That link is the important part of this screen, not decoration.
 */
export default function LoginForm() {
  const { authed, signin } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = (data.get('username') as string | null) ?? '';
    const password = (data.get('password') as string | null) ?? '';
    if (!username || !password) return;

    // Guards against a second submit while the first is in flight - the button
    // is the whole interaction, so double-firing it is easy on a slow disk.
    setBusy(true);
    try {
      await signin({ username, password });
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (authed) navigate('/');
  }, [authed, navigate]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          {/* A wordmark rather than an image. The logo file that used to sit in
              this app belonged to a different company entirely. */}
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Xpeed<span className="text-emerald-600">POS</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Point of sale · works offline
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-slate-900">Sign in</h2>

          <form onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              size="small"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              disabled={busy}
              sx={{
                mt: 3,
                py: 1.2,
                textTransform: 'none',
                fontSize: '0.95rem',
              }}
            >
              {busy ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <p className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
            First time here?{' '}
            <Link
              to="/register"
              className="font-medium text-emerald-700 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
