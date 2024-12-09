import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle2, Facebook } from 'lucide-react';
import { loginStart, loginSuccess, loginFailure, registerStart, registerFailure, registerSuccess } from '../../redux/features/user/userSlice';
import { publicRequest } from '@/service/requestMethods';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Separate Modal Component
const SuccessModal = ({ isOpen, onClose, onGoToLogin }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-sm text-center">
      <div className="flex flex-col items-center space-y-4 p-4">
        <CheckCircle2 className="h-16 w-16 text-green-500" strokeWidth={1.5} />
        <div>
          <DialogTitle className="text-xl mb-2">Registration Successful</DialogTitle>
          <DialogDescription>
            Your account has been created. You can now log in.
          </DialogDescription>
        </div>
        <Button onClick={onGoToLogin} className="w-full">
          Go to Login
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

// Social Icons Components
const XLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GoogleLogo = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    role: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    dispatch(loginStart());

    try {
      const response = await publicRequest.post('/auth/login', loginForm);
      dispatch(loginSuccess(response.data));
      response.data.role === 'photographer' 
        ? navigate(`/photographerProfile/${response.data.id}`) 
        : navigate('/');
    } catch (err) {
      dispatch(loginFailure());
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

// problems !!


  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    dispatch(registerStart());

    const { username, role, email, password } = registerForm;
    if (!username || !email || !password || !role) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    try {
      await publicRequest.post('/auth/register', registerForm);
      dispatch(registerSuccess());
      setShowSuccessModal(true);
      setRegisterForm({ username: '', role: '', email: '', password: '' }); // Clear form
    } catch (err) {
      dispatch(registerFailure());
      setError(err.response?.data?.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Social login with ${provider} clicked`);
    // Implement social login logic here
  };

  const handleGoToLogin = () => {
    setShowSuccessModal(false);
    setActiveTab("login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                {/* Social Login Section */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={() => handleSocialLogin('facebook')}
                    className="w-full"
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                  </Button>
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    className="w-full"
                  >
                    <GoogleLogo />
                  </Button>
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={() => handleSocialLogin('twitter')}
                    className="w-full"
                  >
                    <XLogo />
                  </Button>
                </div>
              </form>
            </CardContent>
          </TabsContent>

          <TabsContent value="register">
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Enter your details to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, username: e.target.value }))}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={registerForm.role}
                    onValueChange={(value) => setRegisterForm(prev => ({ ...prev, role: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="photographer">Photographer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input 
                    id="register-password" 
                    type="password" 
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>

                {/* Social Login Section */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={() => handleSocialLogin('facebook')}
                    className="w-full"
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                  </Button>
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    className="w-full"
                  >
                    <GoogleLogo />
                  </Button>
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={() => handleSocialLogin('twitter')}
                    className="w-full"
                  >
                    <XLogo />
                  </Button>
                </div>
              </form>
            </CardContent>
          </TabsContent>
        </Tabs>

        {error && (
          <div className="text-red-500 text-center p-4">
            {error}
          </div>
        )}

        <SuccessModal 
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          onGoToLogin={handleGoToLogin}
        />
      </Card>
    </div>
  );
};

export default AuthPage;