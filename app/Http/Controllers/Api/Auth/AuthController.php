<?php

namespace App\Http\Controllers\Api\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public $successStatus = 200;
    public $failStatus = 401;
    public function login(Request $request)
    {
        
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token =  $user->createToken($user->name.' '.$user->email.' '. now())->accessToken;
            return response()->json(['token' => $token, 'user'=> $user], $this->successStatus);
        } 
        else {
            return response()->json(['error' => 'Email or Password don\'t match'], $this->failStatus);
        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' =>'required|string|min:8|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json(["errors" => $validator->errors()], $this->failStatus);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        $token =  $user->createToken($user->name . ' ' . $user->email . ' ' . now())->accessToken;
        return response()->json(['user' => $user, 'token' =>$token], $this->successStatus);
    }
    public function details()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], $this->successStatus);
    } 
    public function logout(Request $request){
        $user = User::find($request->id);
        return response()->json($user, 201);
    }
}
?>