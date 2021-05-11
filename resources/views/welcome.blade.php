<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>React Laravel</title>
    <link rel="stylesheet" href="{{ asset('Font-Awesome-master/css/all.css') }}">
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <style>
        .itm {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: 100%;
        }

        .navigasi {
            color: #fff;
            margin-right: 20px
        }

    </style>
</head>

<body>
    <nav style="width: 100%; height: 50px; background: #000; position: fixed; z-index: 99999;">
        <div class="itm">
            <div class="navigasi">
                <a style="color: #fff" href="{{ route('logout') }}"
                    onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                    <span><i class="fas fa-sign-out-alt"></i> {{ __('Logout') }}</span>
                </a>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                    @csrf
                </form>
            </div>
        </div>
    </nav>
    <br />
    <br />
    <div id="root"></div>

    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>
