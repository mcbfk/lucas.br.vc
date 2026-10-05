<?php

$shouldDisplay404 = true;
foreach ($excludedURLs as $excludedURL) {
    if ($currentURL === $excludedURL) {
        $shouldDisplay404 = false;
        break;
    }
}

if ($shouldDisplay404) {
    echo '<!DOCTYPE html>';
    echo '<html lang="en">';
    echo '<head>';
    echo '<meta charset="UTF-8">';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    echo '<title>Erro 404 - Página não encontrada</title>';
    echo '<style>';
    echo 'body {';
    echo '    font-family: Arial, sans-serif;';
    echo '    text-align: center;';
    echo '    background-color: #e9ecef;';
    echo '}';
    echo '.container {';
    echo '    display: flex;';
    echo '    justify-content: center;';
    echo '    align-items: center;';
    echo '    flex-direction: column;';
    echo '    width: 100%;';
    echo '    height: 100vh;';
    echo '}';
    echo 'h1 {';
    echo '    margin-top: 0;';
    echo '    font-size: 48px;';
    echo '    color: #007bff;';
    echo '}';
    echo 'p {';
    echo '    font-size: 18px;';
    echo '    color: #6c757d;';
    echo '}';
    echo 'a {';
    echo '    color: #007bff;';
    echo '    text-decoration: none;';
    echo '    font-weight: bold;';
    echo '}';
    echo 'a:hover {';
    echo '    color: #0056b3;';
    echo '    text-decoration: underline;';
    echo '}';
    echo '</style>';
    echo '</head>';
    echo '<body>';
    echo '<div class="container">';
    echo '<h1>Erro 404</h1>';
    echo '<p>Desculpe, a página que você está procurando não foi encontrada.</p>';
    echo '<p><a href="https://lucas.br.vc/">Voltar à página inicial</a></p>';
    echo '</div>';
    echo '</body>';
    echo '</html>';
    exit();
}
?>
