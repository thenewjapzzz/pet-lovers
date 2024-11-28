import React, { useState } from "react";
import axios from "axios";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Enviar apenas email e senha para a API
      const response = await axios.post("http://localhost:3000/", {
        email,
        password
      });

      // Extrair token e empresaId da resposta
      const { token, empresa_id } = response.data;
      console.log("Token:", token);
      console.log("Empresa ID:", empresa_id);

      // Armazenar token e empresaId no localStorage
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("empresa_id", String(empresa_id));

      alert("Login successful!");
      navigate('/home');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError("Invalid email or password");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-500">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="mt-1"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full bg-orange-600">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
