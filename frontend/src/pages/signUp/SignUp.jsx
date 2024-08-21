import GenderCheckbox from "./genderCheckbox";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

export const SignUp = () => {

    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "", 
        gender:""
    })

    const {loading, signup} = useSignup();

    const handleCheckboxChange = (gender) => {
            setInputs({...inputs, gender})
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await signup(inputs)
    }
    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Sign up <span className="text-blue-500">ChatApp</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className=" text-base label-text">Full Name</span>
                        </label>
                        <input
                        type="text" 
                        placeholder="John Doe"
                        className=" w-full input input-bordered h-10"
                        value={inputs.fullName}
                        onChange={(evt) => setInputs({...inputs, fullName: evt.target.value})}/>
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input 
                        type="text" 
                        placeholder="johndoe"
                        className=" w-full input input-bordered h-10"
                        value={inputs.username}
                        onChange={(evt) => setInputs({...inputs, username: evt.target.value})}/>
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input 
                        type="password"
                        placeholder="Enter password" 
                        className=" w-full input input-bordered h-10"
                        value={inputs.password}
                        onChange={(evt) => setInputs({...inputs, password: evt.target.value})}/>
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Confirm password</span>
                        </label>
                        <input 
                        type="password"
                        placeholder="Confirm password" 
                        className="w-full input input-bordered h-10"
                        value={inputs.confirmPassword}
                        onChange={(evt) => setInputs({...inputs, confirmPassword: evt.target.value})}/>
                    </div>
                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>
                    <Link to="/login" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                        Already have an account?
                    </Link>
                    <div>
                        <button className="btn btn-block btn-sm mt-2" disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span> : "Sign up"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

