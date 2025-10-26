// // src/components/AuthModal.jsx
// import React, { useState, useEffect, useContext } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import api from "../utils/api";
// import { AuthContext } from "../context/AuthContext";
// import AuthCard from "../components/AuthCard";

// const AuthModal = ({ isOpen, onClose }) => {
//   const { login } = useContext(AuthContext);
//   const [isLogin, setIsLogin] = useState(true);
//   const [isCaptain, setIsCaptain] = useState(false);
//   const [isForgotPassword, setIsForgotPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const [form, setForm] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//     accessKey: "",
//   });

//   // ✅ Remember last mode in localStorage
//   useEffect(() => {
//     const savedLoginMode = localStorage.getItem("auth_isLogin");
//     const savedRole = localStorage.getItem("auth_isCaptain");

//     if (savedLoginMode !== null) setIsLogin(savedLoginMode === "true");
//     if (savedRole !== null) setIsCaptain(savedRole === "true");
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("auth_isLogin", isLogin);
//     localStorage.setItem("auth_isCaptain", isCaptain);
//   }, [isLogin, isCaptain]);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       // Handle Forgot Password separately
//       if (isForgotPassword) {
//         const endpoint = isCaptain
//           ? "/captains/forgot-password"
//           : "/users/forgot-password";

//         await api.post(endpoint, { email: form.email });
//         setMessage("✅ Password reset link sent to your email!");
//         setLoading(false);
//         return;
//       }

//       const endpoint = isCaptain
//         ? isLogin
//           ? "/captains/login"
//           : "/captains/register"
//         : isLogin
//         ? "/users/login"
//         : "/users/register";

//       const payload = isCaptain
//         ? isLogin
//           ? { email: form.email, password: form.password }
//           : {
//               fullname: { firstname: form.firstname, lastname: form.lastname },
//               email: form.email,
//               password: form.password,
//               accessKey: form.accessKey,
//             }
//         : isLogin
//         ? { email: form.email, password: form.password }
//         : {
//             fullname: { firstname: form.firstname, lastname: form.lastname },
//             email: form.email,
//             password: form.password,
//           };

//       const res = await api.post(endpoint, payload);
//       const { token, user, captain } = res.data;

//       if (!token) throw new Error("Authentication failed");

//       localStorage.setItem(isCaptain ? "captainToken" : "authToken", token);
//       await login(isCaptain ? captain || form : user || form, isCaptain ? "captain" : "user");

//       onClose();
//     } catch (err) {
//       alert(err.response?.data?.message || "Authentication failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Background Overlay */}
//           <motion.div
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           />

//           {/* Auth Modal */}
//           <motion.div
//             className="fixed inset-0 flex items-center justify-center z-[101] p-4"
//             initial={{ opacity: 0, scale: 0.9, y: 50 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 50 }}
//             transition={{ duration: 0.3 }}
//           >
//             <AuthCard
//               title={
//                 isForgotPassword
//                   ? "Forgot Password?"
//                   : isCaptain
//                   ? "Captain Portal ⚓"
//                   : "Welcome Back 👋"
//               }
//               subtitle={
//                 isForgotPassword
//                   ? "We’ll send you a reset link"
//                   : isCaptain
//                   ? "Manage your destinations and trips"
//                   : "Start your journey with VitalTrip"
//               }
//             >
//               {/* Tabs */}
//               {!isForgotPassword && (
//                 <div className="flex justify-center mb-4 bg-white/10 rounded-lg overflow-hidden">
//                   <button
//                     onClick={() => setIsLogin(true)}
//                     className={`w-1/2 py-2 font-semibold ${
//                       isLogin ? "bg-white/20 text-white" : "text-white/60"
//                     }`}
//                   >
//                     Login
//                   </button>
//                   <button
//                     onClick={() => setIsLogin(false)}
//                     className={`w-1/2 py-2 font-semibold ${
//                       !isLogin ? "bg-white/20 text-white" : "text-white/60"
//                     }`}
//                   >
//                     Signup
//                   </button>
//                 </div>
//               )}

//               {/* Role Switch */}
//               {!isForgotPassword && (
//                 <div className="flex justify-center mb-6">
//                   <button
//                     onClick={() => setIsCaptain(!isCaptain)}
//                     className="text-cyan-300 hover:underline font-medium text-sm"
//                   >
//                     {isCaptain ? "Switch to User Mode" : "Captain Access"}
//                   </button>
//                 </div>
//               )}

//               {/* Form */}
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Forgot Password Mode */}
//                 {isForgotPassword ? (
//                   <>
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Enter your registered email"
//                       value={form.email}
//                       onChange={handleChange}
//                       className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
//                     />
//                     {message && (
//                       <p className="text-center text-green-300 text-sm">{message}</p>
//                     )}
//                     <motion.button
//                       whileTap={{ scale: 0.95 }}
//                       disabled={loading}
//                       className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-semibold shadow-lg hover:shadow-blue-400/40 transition-all"
//                     >
//                       {loading ? "Sending..." : "Send Reset Link"}
//                     </motion.button>

//                     <button
//                       type="button"
//                       onClick={() => setIsForgotPassword(false)}
//                       className="block w-full text-center text-white/70 hover:text-white text-sm mt-4"
//                     >
//                       ← Back to Login
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     {!isLogin && (
//                       <div className="flex gap-2">
//                         <input
//                           type="text"
//                           name="firstname"
//                           placeholder="First Name"
//                           value={form.firstname}
//                           onChange={handleChange}
//                           className="w-1/2 p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
//                         />
//                         <input
//                           type="text"
//                           name="lastname"
//                           placeholder="Last Name"
//                           value={form.lastname}
//                           onChange={handleChange}
//                           className="w-1/2 p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
//                         />
//                       </div>
//                     )}

//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Email"
//                       value={form.email}
//                       onChange={handleChange}
//                       className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
//                     />

//                     <input
//                       type="password"
//                       name="password"
//                       placeholder="Password"
//                       value={form.password}
//                       onChange={handleChange}
//                       className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
//                     />

//                     {!isLogin && isCaptain && (
//                       <input
//                         type="text"
//                         name="accessKey"
//                         placeholder="Captain Access Key"
//                         value={form.accessKey}
//                         onChange={handleChange}
//                         className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-yellow-400"
//                       />
//                     )}

//                     <motion.button
//                       whileTap={{ scale: 0.95 }}
//                       disabled={loading}
//                       className={`w-full py-3 rounded-lg text-white font-semibold shadow-lg transition-all ${
//                         isCaptain
//                           ? "bg-gradient-to-r from-teal-500 to-cyan-500"
//                           : "bg-gradient-to-r from-pink-500 to-purple-500"
//                       } hover:shadow-cyan-400/40`}
//                     >
//                       {loading
//                         ? isLogin
//                           ? "Logging in..."
//                           : "Creating account..."
//                         : isLogin
//                         ? "Login"
//                         : "Sign Up"}
//                     </motion.button>

//                     {/* Forgot password link */}
//                     {isLogin && (
//                       <button
//                         type="button"
//                         onClick={() => setIsForgotPassword(true)}
//                         className="block w-full text-center text-white/70 hover:text-white text-sm mt-4"
//                       >
//                         Forgot Password?
//                       </button>
//                     )}
//                   </>
//                 )}
//               </form>

//               {/* Close Modal */}
//               <button
//                 onClick={onClose}
//                 className="mt-6 block w-full text-center text-white/70 hover:text-white text-sm"
//               >
//                 ✖ Close
//               </button>
//             </AuthCard>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default AuthModal;


// ✅ src/components/AuthModal.jsx
import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import AuthCard from "../components/AuthCard";

const AuthModal = ({ isOpen, onClose }) => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isCaptain, setIsCaptain] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    accessKey: "",
  });

  useEffect(() => {
    const savedLoginMode = localStorage.getItem("auth_isLogin");
    const savedRole = localStorage.getItem("auth_isCaptain");
    if (savedLoginMode !== null) setIsLogin(savedLoginMode === "true");
    if (savedRole !== null) setIsCaptain(savedRole === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("auth_isLogin", isLogin);
    localStorage.setItem("auth_isCaptain", isCaptain);
  }, [isLogin, isCaptain]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Validation logic
  const validate = () => {
    const newErrors = {};
    if (!isForgotPassword && !isLogin) {
      if (!form.firstname.trim()) newErrors.firstname = "Please enter first name.";
      if (!form.lastname.trim()) newErrors.lastname = "Please enter last name.";
    }

    if (!form.email.trim()) newErrors.email = "Please enter your email.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Please enter a valid email address.";

    if (!isForgotPassword) {
      if (!form.password.trim()) newErrors.password = "Please enter your password.";
      else if (form.password.length < 6)
        newErrors.password = "Password must be at least 6 characters long.";
    }

    if (!isLogin && isCaptain && !form.accessKey.trim())
      newErrors.accessKey = "Please enter your Captain Access Key.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validate()) return;
    setLoading(true);

    try {
      if (isForgotPassword) {
        const endpoint = isCaptain
          ? "/captains/forgot-password"
          : "/users/forgot-password";
        await api.post(endpoint, { email: form.email });
        setMessage("✅ Password reset link sent to your email!");
        setLoading(false);
        return;
      }

      const endpoint = isCaptain
        ? isLogin
          ? "/captains/login"
          : "/captains/register"
        : isLogin
        ? "/users/login"
        : "/users/register";

      const payload = isCaptain
        ? isLogin
          ? { email: form.email, password: form.password }
          : {
              fullname: { firstname: form.firstname, lastname: form.lastname },
              email: form.email,
              password: form.password,
              accessKey: form.accessKey,
            }
        : isLogin
        ? { email: form.email, password: form.password }
        : {
            fullname: { firstname: form.firstname, lastname: form.lastname },
            email: form.email,
            password: form.password,
          };

      const res = await api.post(endpoint, payload);
      const { token, user, captain } = res.data;
      if (!token) throw new Error("Authentication failed");

      localStorage.setItem(isCaptain ? "captainToken" : "authToken", token);
      await login(isCaptain ? captain || form : user || form, isCaptain ? "captain" : "user");
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Auth Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[101] p-4"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
              {/* ❌ Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-semibold"
              >
                ×
              </button>

              <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                {isForgotPassword
                  ? "Forgot Password?"
                  : isCaptain
                  ? "Captain Portal ⚓"
                  : "Welcome Back 👋"}
              </h2>
              <p className="text-gray-600 text-center mb-6">
                {isForgotPassword
                  ? "We’ll send you a reset link"
                  : isCaptain
                  ? "Manage your destinations and trips"
                  : "Start your journey with VitalTrip"}
              </p>

              {!isForgotPassword && (
                <div className="flex justify-center mb-4 bg-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`w-1/2 py-2 font-semibold ${
                      isLogin
                        ? "bg-purple-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`w-1/2 py-2 font-semibold ${
                      !isLogin
                        ? "bg-purple-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Signup
                  </button>
                </div>
              )}

              {!isForgotPassword && (
                <div className="flex justify-center mb-5">
                  <button
                    onClick={() => setIsCaptain(!isCaptain)}
                    className="text-sm text-purple-600 font-medium hover:underline"
                  >
                    {isCaptain ? "Switch to User Mode" : "Captain Access"}
                  </button>
                </div>
              )}

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {isForgotPassword ? (
                  <>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your registered email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                    {message && (
                      <p className="text-green-600 text-sm text-center">
                        {message}
                      </p>
                    )}

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      disabled={loading}
                      className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all"
                    >
                      {loading ? "Sending..." : "Send Reset Link"}
                    </motion.button>

                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(false)}
                      className="block w-full text-center text-sm text-gray-600 hover:underline mt-3"
                    >
                      ← Back to Login
                    </button>
                  </>
                ) : (
                  <>
                    {!isLogin && (
                      <div className="flex gap-2">
                        <div className="w-1/2">
                          <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={form.firstname}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                          />
                          {errors.firstname && (
                            <p className="text-red-500 text-sm">{errors.firstname}</p>
                          )}
                        </div>
                        <div className="w-1/2">
                          <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={form.lastname}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                          />
                          {errors.lastname && (
                            <p className="text-red-500 text-sm">{errors.lastname}</p>
                          )}
                        </div>
                      </div>
                    )}

                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                      )}
                    </div>

                    {!isLogin && isCaptain && (
                      <div>
                        <input
                          type="text"
                          name="accessKey"
                          placeholder="Captain Access Key"
                          value={form.accessKey}
                          onChange={handleChange}
                          className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                        {errors.accessKey && (
                          <p className="text-red-500 text-sm">{errors.accessKey}</p>
                        )}
                      </div>
                    )}

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      disabled={loading}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                      {loading
                        ? isLogin
                          ? "Logging in..."
                          : "Creating account..."
                        : isLogin
                        ? "Login"
                        : "Sign Up"}
                    </motion.button>

                    {isLogin && (
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(true)}
                        className="block w-full text-center text-sm text-gray-600 hover:underline mt-3"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
