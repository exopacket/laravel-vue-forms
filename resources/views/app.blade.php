<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Title</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Barlow:wght@0,200..900;1,700">
    <link rel="icon" type="image/png" href="/img/favicon.png"/>
    <style>
        html, body, #app {
            height:100%;
            font-family: Barlow;
        }
    </style>
    @routes
    @vite
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
</head>
<body class="antialiased bg-gray-100">
<script>
</script>
@inertia
</body>
</html>
