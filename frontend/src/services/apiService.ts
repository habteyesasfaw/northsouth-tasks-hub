import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";

const API_BASE_URL = "http://localhost:8000/api";

/**
 * ApiService class for handling authentication and API requests.
 */
class ApiService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            withCredentials: true, // Ensure cookies are sent with requests
        });

        this.setupInterceptors();
    }

    /**
     * Set up Axios interceptors for handling retries and errors.
     */
    private setupInterceptors() {
        // Configure automatic retries
        axiosRetry(this.axiosInstance, {
            retries: 3,
            retryCondition: (error) => error.response?.status === 429,
            retryDelay: (retryCount) => Math.pow(2, retryCount) * 1000, // Exponential backoff
        });

        // Handle request and response errors
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    this.logout();
                    window.location.href = "/login"; // Redirect to login on unauthorized
                }
                return Promise.reject(error);
            }
        );
    }

    /**
     * Log in a user and store authentication details.
     * @param email - User email
     * @param password - User password
     */
    async login(email: string, password: string) {
        const response = await this.axiosInstance.post("/login", { email, password });
        const { token, user } = response.data;

        this.setAuthorization(token);
        localStorage.setItem("authUser", JSON.stringify({ token, user }));
        return user;
    }

    /**
     * Log out the current user and clear stored authentication data.
     */
    logout() {
        localStorage.removeItem("authUser");
        delete this.axiosInstance.defaults.headers.common["Authorization"];
    }

    /**
     * Register a new user.
     * @param name - User's name
     * @param email - User's email
     * @param username - Username
     * @param password - Password
     */
    async register(name: string, email: string, username: string, password: string) {
        const response = await this.axiosInstance.post("/register", {
            name,
            email,
            username,
            password,
        });
        return response.data;
    }

    /**
     * Fetch the currently logged-in user's profile.
     */
    async getProfile() {
        return await this.axiosInstance.get("/auth/profile");
    }

    /**
     * Set the Authorization header for future requests.
     * @param token - JWT token
     */
    private setAuthorization(token: string) {
        this.axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    /**
     * Refresh the token if it's expired.
     */
    async refreshToken() {
        const response = await this.axiosInstance.post("/auth/refresh");
        const { token } = response.data;

        this.setAuthorization(token);
        const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
        localStorage.setItem("authUser", JSON.stringify({ ...authUser, token }));
    }

    /**
     * Generic GET request handler.
     * @param url - API endpoint
     * @param config - Axios request config
     */
    async get(url: string, config?: AxiosRequestConfig) {
        return await this.axiosInstance.get(url, config);
    }

    /**
     * Generic POST request handler.
     * @param url - API endpoint
     * @param data - Request payload
     * @param config - Axios request config
     */
    async post(url: string, data?: any, config?: AxiosRequestConfig) {
        return await this.axiosInstance.post(url, data, config);
    }

    /**
     * Generic PUT request handler.
     * @param url - API endpoint
     * @param data - Request payload
     * @param config - Axios request config
     */
    async put(url: string, data?: any, config?: AxiosRequestConfig) {
        return await this.axiosInstance.put(url, data, config);
    }

    /**
     * Generic DELETE request handler.
     * @param url - API endpoint
     * @param config - Axios request config
     */
    async delete(url: string, config?: AxiosRequestConfig) {
        return await this.axiosInstance.delete(url, config);
    }

    /**
     * Retrieve the logged-in user's information from localStorage.
     */
    getLoggedUser() {
        const authUser = localStorage.getItem("authUser");
        return authUser ? JSON.parse(authUser).user : null;
    }

    /**
     * Check if a user is authenticated.
     */
    isAuthenticated() {
        const authUser = localStorage.getItem("authUser");
        return !!authUser && !!JSON.parse(authUser).token;
    }
}

export const apiService = new ApiService();
export default apiService;
