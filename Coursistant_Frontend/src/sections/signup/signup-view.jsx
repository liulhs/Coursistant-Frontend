import axios from 'axios';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

export default function SignUpView() {
  const theme = useTheme();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://api.e-ta.net/api/signup', { firstName, lastName, email, password });

      if (response.status === 200) {
        setSuccess(response.data.message);
        setError('');
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      }
    } catch (err) {
      console.log(err);
      setError('Sign up failed');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="firstName"
          label="First name"
          value={firstName}
          onChange={handleChange(setFirstName)}
          required
        />

        <TextField
          name="lastName"
          label="Last name"
          value={lastName}
          onChange={handleChange(setLastName)}
          required
        />

        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={handleChange(setEmail)}
          required
        />

        <TextField
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={handleChange(setPassword)}
          required
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        {/* <Link variant="subtitle2" underline="hover">
          {}
        </Link> */}
      </Stack>

      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        loading={loading}
      >
        Sign Up
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign Up to Coursistant</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already registered?
            <Link variant="subtitle2" sx={{ ml: 0.5 }} href="/login">
              Sign in
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
