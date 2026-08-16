import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useAuth } from 'renderer/context/AuthContextProvider';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  // There was no length rule at all, so a single character was a valid password
  // on a till that handles cash.
  password: yup
    .string()
    .min(6, 'Use at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm the password'),
});

export default function RegistrationForm() {
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await register({
          name: values.name,
          username: values.username,
          password: values.password,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Xpeed<span className="text-emerald-600">POS</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Point of sale · works offline
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-slate-900">
            Create an account
          </h2>

          <form onSubmit={formik.handleSubmit} noValidate>
            <TextField
              margin="normal"
              fullWidth
              size="small"
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              margin="normal"
              fullWidth
              size="small"
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              margin="normal"
              fullWidth
              size="small"
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              margin="normal"
              fullWidth
              size="small"
              name="confirmPassword"
              label="Confirm password"
              type="password"
              autoComplete="new-password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              disabled={formik.isSubmitting}
              sx={{
                mt: 3,
                py: 1.2,
                textTransform: 'none',
                fontSize: '0.95rem',
              }}
            >
              {formik.isSubmitting ? 'Creating…' : 'Create account'}
            </Button>
          </form>

          <p className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-emerald-700 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
