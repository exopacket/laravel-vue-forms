<?php

use Illuminate\Support\Facades\Response;

class ApiResult
{

    //VERY BASIC (will change)
    public static function badRequest($message)
    {
        $root = (object)[];
        $error = (object)[];
        $data = (object)[];
        $success = (object)[];
        $redirect = (object)[];
        $redirect->is = false;
        $redirect->href = null;
        $success->is = false;
        $error->is = true;
        $error->message = $message;
        $data->content = "fail";
        $root->success = $success;
        $root->error = $error;
        $root->data = $data;
        $root->redirect = $redirect;

        return Response::json($root, 400);
    }

    public static function unauthorized($message)
    {
        $root = (object)[];
        $error = (object)[];
        $data = (object)[];
        $success = (object)[];
        $redirect = (object)[];
        $redirect->is = false;
        $redirect->href = null;
        $success->is = false;
        $error->is = true;
        $error->message = $message;
        $data->content = "fail";
        $root->success = $success;
        $root->error = $error;
        $root->data = $data;
        $root->redirect = $redirect;

        return Response::json($root, 401);
    }

    public static function unprocessable($message)
    {
        $root = (object)[];
        $error = (object)[];
        $data = (object)[];
        $success = (object)[];
        $redirect = (object)[];
        $redirect->is = false;
        $redirect->href = null;
        $success->is = false;
        $error->is = true;
        $error->message = $message;
        $data->content = "unprocessable";
        $root->success = $success;
        $root->error = $error;
        $root->response = $data;
        $root->redirect = $redirect;

        return Response::json($root, 422);
    }

    public static function success($response = "successful", $redirect = null)
    {
        $root = (object)[];
        $error = (object)[];
        $data = (object)[];
        $success = (object)[];
        $next = (object)[];
        $next->is = isset($redirect);
        $next->href = (isset($redirect)) ? $redirect : null;
        $success->is = true;
        $error->is = false;
        $error->message = null;
        $data->content = $response;
        $root->success = $success;
        $root->error = $error;
        $root->response = $data;
        $root->redirect = $next;

        return Response::json($root, 200);
    }

}
