<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Client;
use Illuminate\Support\Facades\Validator;
use App\Rules\ValidarRut;
class ClientController extends Controller
{
    public function createClient(Request $request)
    {
        $rules = [
            'first_name' => 'required|string|max:100',
            'second_name' => 'required|string|max:100',
            'first_last_name' => 'required|string|max:100',
            'second_last_name' => 'required|string|max:100',
            'identificador' => ['required','unique:clients,identificador',new ValidarRut()],
            'email' => 'required|string|email|max:100|unique:clients,email',
            'score' => 'required|integer| min:0',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400);
        }
        $client = Client::create([
            'first_name' => $request->first_name,
            'second_name' => $request->second_name,
            'first_last_name' => $request->first_last_name,
            'second_last_name' => $request->second_last_name,
            'identificador' => $request->identificador,
            'email' => $request->email,
            'score' => $request->score,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Client created successfully',
        ], 201);
    }

    public function updateClient(Request $request, Client $client)
    {
        //reglas de validacion
        $rules = [
            'first_name' => 'required|string|max:100',
            'second_name' => 'required|string|max:100',
            'first_last_name' => 'required|string|max:100',
            'second_last_name' => 'required|string|max:100',
            'email' => 'required|string|email|max:100|unique:clients,email,' . $client->id,
            'score' => 'required|integer| min:0',
        ];

        //validar datos de entrada
        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400);
        }
        //actualizar usuario
        $client->update($request->input());
        return response()->json([
            'status' => true,
            'message' => 'Client updated successfully',
        ], 200);
    }


    public function indexClient()
    {
        //retorna todos los clientes
        return Client::all();
    }


    public function destroyClient(Client $client)
    {
        //elimina un cliente
        $client->delete();
        return response()->json([
            'res => true',
            'mensaje' => 'Client deleted successfully'
        ],200);

    }


}
