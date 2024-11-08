import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { login, register } from '../../redux/features/user/userSlice';

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('client');

  const handleEmailAuth = async (e, isSignIn) => {
    e.preventDefault();
    const authAction = isSignIn ? login : register;
    const credentials = isSignIn ? { email, password } : { username, email, password, role };

    try {
      const resultAction = await dispatch(authAction(credentials));
      if (authAction.fulfilled.match(resultAction)) {
        const user = resultAction.payload;
        toast({
          title: isSignIn ? "Signed in successfully" : "Registered successfully",
          description: `Welcome ${user.username}!`,
        });

        if (isSignIn) {
          navigate(user.role === 'photographer' ? '/photographer-dashboard' : '/home');
        } else {
          if (user.role === 'photographer') {
            navigate('/photographer-details');
          } else {
            navigate('/home');
          }
        }
      } else if (authAction.rejected.match(resultAction)) {
        throw new Error(resultAction.error.message);
      }
    } catch (err) {
      toast({
        title: "Authentication failed",
        description: err.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleSocialAuth = async (provider) => {
    console.log(`Authenticate with ${provider}`);
    toast({
      title: "Social Authentication",
      description: `${provider} authentication is not implemented yet.`,
      variant: "default",
    });
  };

  const AuthForm = ({ isSignIn }) => (
    <form onSubmit={(e) => handleEmailAuth(e, isSignIn)} className="space-y-4">
      {!isSignIn && (
        <>
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Enter your username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <Select onValueChange={setRole} defaultValue={role}>
              <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="photographer">Photographer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input 
          type="email" 
          id="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input 
          type="password" 
          id="password" 
          placeholder="Enter your password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={isLoading}>
        {isLoading ? "Processing..." : (isSignIn ? 'Sign In' : 'Register')}
      </Button>
    </form>
  );

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="w-full max-w-md px-4 py-8 sm:px-0">
        <Card className="backdrop-blur-sm bg-white/70 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">Welcome to ShutterSpot</CardTitle>
            <CardDescription className="text-center text-gray-600">Sign in or create an account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Sign In</TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <AuthForm isSignIn={true} />
              </TabsContent>
              <TabsContent value="register">
                <AuthForm isSignIn={false} />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="relative w-full mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full">
              <Button variant="outline" onClick={() => handleSocialAuth('Google')} className="bg-white hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
              </Button>
              <Button variant="outline" onClick={() => handleSocialAuth('Facebook')} className="bg-white hover:bg-gray-100">
                <Facebook className="w-5 h-5 text-blue-600" />
              </Button>
              <Button variant="outline" onClick={() => handleSocialAuth('X')} className="bg-white hover:bg-gray-100">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;