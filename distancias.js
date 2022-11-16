//calcDistKm
function encontraMaisProx(pointA,caminhos) {
    const pontos = caminhos.length;
    let pontoMaisProx;
    let menorDistancia = 50000;

    for (let i = 0; i < pontos; i++) {
        distAtual = calcDistKm(pointA, caminhos[i]);
        if (distAtual <= menorDistancia) {
            menorDistancia = distAtual;
            pontoMaisProx = caminhos[i];
        }
    }
    return [pontoMaisProx, menorDistancia];
}
