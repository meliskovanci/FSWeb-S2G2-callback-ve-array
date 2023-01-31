const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const evSahibi = fifaData.filter((mac) => mac.Year === 2014 && mac.Stage === "Final");
console.log(evSahibi[0]["Home Team Name"]);


//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
console.log(evSahibi[0]["Away Team Name"]);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log(evSahibi[0]["Home Team Goals"]);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log(evSahibi[0]["Away Team Goals"]);
//(e) 2014 Dünya kupası finali kazananı*/
if (evSahibi[0]["Home Team Name"]> evSahibi[0]["Away Team Name"]){
	console.log("Kazanan"+evSahibi[0]["Home Team Name"])

} else {
	console.log("Kazanan"+evSahibi[0]["Away Team Name"])
}

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(array) {
	
	const final = array.filter((mac) => mac.Stage === "Final");

	return final;
    
}

console.log(Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(array,cb_finaller) {
	const finaller = cb_finaller(array);
    const yillar = finaller.map(element => {
	return element.Year;
   })	
    return yillar;
}
console.log(Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(data,callback) {
	const finaller = callback(data);
	let kazananlar =[];
	for(let i=0;i<finaller.length;i++){
		if (finaller[i]["Home Team Goals"]<finaller[i]["Away Team Goals"]){
			kazananlar.push(finaller[i]["Away Team Name"])
		} else {
			kazananlar.push(finaller[i]["Home Team Name"])
		}
	} 

	//forEach yöntemi
	// finaller.forEach(item=>{
	// 	 if (item["Home Team Goals"]<item["Away Team Goals"]){
	// 		kazananlar.push(item["Away Team Name"])
	// 	 } else{

	// 	  kazananlar.push(item["Home Team Name"])}
	// })



//map yöntemi
    //    kazananlar = finaller.map(item=>{
	// 	if (item["Home Team Goals"]<item["Away Team Goals"]){
	// 				return (item["Away Team Name"])
	// 			 } else {
		
	// 		 	  return (item["Home Team Name"])}
	//    })


	return kazananlar; 
	
    
	
}

 console.log(Kazananlar(fifaData,Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(data, cb_finaller, cb_yillar, cb_kazananlar) { 	let arr = []; 	
	let yillar = cb_yillar (data, cb_finaller); 	
	let kazananlar = cb_kazananlar (data, cb_finaller); 	kazananlar.forEach ((item, i) => { 		
		arr.push (`${yillar[i]} yılında, ${item} dünya kupasını kazandı!`); 	}) 	
		return arr;
	 } 
		console.log (YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(gol) {
	let toplamGol = gol.reduce ((total,item) => { 
		return total + item["Home Team Goals"] + item["Away Team Goals"];},0)	
    return (toplamGol / gol.length).toFixed(2) ;
}
console.log(OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(data) {
	
		let teamScores = {};
	  
		for (let i=0;i<data.length ;i++) {
		  teamScores[i] = (teamScores[i] || 0) + team.goals;
		}
	  
		let maxScore = 0;
		let teamWithMaxScore = '';
	  
		for (let x=0 ; x<maxScore.length ; x++) {
		  if (teamScores[x] > maxScore) {
			maxScore = teamScores[x];
			teamWithMaxScore = team;
		  }
		}
	  
		return teamWithMaxScore;
	  }
	  console.log(EnCokGolAtan(fifaData));
    
	



/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
