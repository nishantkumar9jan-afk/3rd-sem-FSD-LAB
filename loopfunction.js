// let num = 0;
// while(num<=10){
//     console.log(num);
//     num+=2;
// }

// const greet = (name = "guest") => `Hello, ${name}`;

// console.log(greet());
// console.log(greet("Aman"));

// const numbers = [1,2,3,4,5] ;
// const double = numbers.map(n=>n*2);
// const evens = numbers.filter(n=> n%2==0);
// const sum = numbers.reduce((total,n)=>total+n,0);
// console.log(double);
// console.log(evens);
// console.log(sum);


<button id="btn">"Click Me"</button>
<p id="output"></p>
<script>
    document.getElementById("btn").addEventListener("click",() => {
     document.getElementById("output"), textContext = "Button was clicked!";
    });
</script>