export async function getDados() {
    const res = await fetch("http://localhost/api/dados.php");
    const data = await res.json();
    return data;
}