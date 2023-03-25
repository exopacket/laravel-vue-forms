<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>RaceLoop</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        html, body, #app {
            height:100%;
            font-family: Barlow;
        }
    </style>
    @routes
    @vite
{{--    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">--}}
</head>
<body class="antialiased bg-gray-100">
<script>
</script>
@inertia
</body>
</html>
