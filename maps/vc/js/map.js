	// Map	
	function initMap() {
		var map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 0, lng: 0},
			zoom: 2,
			minZoom: 2,
			streetViewControl: false,
			noClear: true,
			backgroundColor: '#7cd1fa',
			mapTypeControlOptions: {
				mapTypeIds: ['map']
			}
		});
	
	// START - Tiles
	var gtaMapType = new google.maps.ImageMapType({
		getTileUrl: function(coord, zoom) {
			var normalizedCoord = getNormalizedCoord(coord, zoom);
				if (!normalizedCoord) {
					return null;
				}
			var bound = Math.pow(2, zoom);
				return "https://dl.dropboxusercontent.com/u/69995561/maps/vc/tiles_jpg/" + zoom + "_" + normalizedCoord.x + "_" + normalizedCoord.y + ".jpg";
		},
	tileSize: new google.maps.Size(256, 256),
	maxZoom: 5,
	name: 'GTA Crazy Maps'
	});
	map.mapTypes.set('map', gtaMapType);
	map.setMapTypeId('map');
	// Normalizes the coords that tiles repeat across the x axis (horizontally) like the standard Google map tiles.
	function getNormalizedCoord(coord, zoom) {
		var y = coord.y;
		var x = coord.x;
		var tileRange = 1 << zoom;
			if (y < 0 || y >= tileRange) {
				return null;
			}
			if (x < 0 || x >= tileRange) {
				 x = (x % tileRange + tileRange) % tileRange;
			}
		return {x: x, y: y};
	}
	// END - Tiles
	// START - Checkbox markers
	var markers = new Array();
		var locations = [
			['<h3>Pacote Secreto 01</h3>','<p>O pacote está localizado localizado ao sul de <i>Ocean Beach</i> na segunda boathouse.</p>', 'package', -57.48, 4.24, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 02</h3>','<p>O pacote está localizado localizado ao sul de <i>Ocean Beach</i> numa formação de rochas na água.</p>', 'package', -54.94, 11.71, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 03</h3>','<p>O pacote está localizado atrás de uma casa a oeste do heliporto <i>de Ocean Beach</i>.</p>', 'package', -54.28, 15.80, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 04</h3>','<p>O pacote está localizado no topo farol.</p>', 'package', -57.24, 43.35, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 05</h3>','<p>O pacote está localizada no estacionamento subterrâneo da <i>Ocean Bay Marina</i>.</p>', 'package', -46.76, 13.38, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 06</h3>','<p>Este pacote está localizado atrás do <i>Ocean View Medical</i>. Vá atrás do hospital nas proximidades para chegar a esta área.</p>', 'package', -38.50, 10.17, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 07</h3>','<p>O pacote está localizado embaixo da ponte que dá acesso a <i>Viceport</i>.</p>', 'package', -32.42, 10.66, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 08</h3>','<p>O pacote está localizado no telhado do estacionamento <i>Washington Mall</i>.</p>', 'package', -34.80, 24.90, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 09</h3>','<p>O pacote pode ser encontrado próximo a uma piscina atrás do prédio rosa perto do <i>Washington Mall</i>.</p>', 'package', -30.66, 29.65, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 10</h3>','<p>O pacote está no telhado da <i>DBP Security</i>.</p>', 'package', -26.49, 35.09, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 11</h3>','<p>O pacote está na varanda atrás da <i>safehouse 1102 Washington Street</i>.</p>', 'package', -27.12, 23.88, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 12</h3>','<p>O pacote está no lado direito da ponte saíndo do escritório do Rosenberg.</p>', 'package', -21.31, 29.11, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 13</h3>','<p>O pacote pode ser encontrado no telhado de um edifício, branco com listras azul, ao sul da delegacia de polícia de <i>Washington Beach</i>.</p>', 'package', -17.58, 36.45, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 14</h3>','<p>O pacote está nas escadarias da cabana de salva-vidas.</p>', 'package', -14.16, 53.02, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 15</h3>','<p>Este pacote está dentro da delegacia de polícia de <i>Washington Beach</i>. Vista o uniforme de polícia quando entrar para não obter um nível de procurado de 2 estrelas.</p>', 'package', -13.91, 37.55, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 16</h3>','<p>O pacote está escondido no canto do spa que fica entre os dois prédios.</p>', 'package', -17.67, 25.73, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 17</h3>','<p>Dentro chuveiro laranja que fica ao ar livre.</p>', 'package', -14.20, 24.10, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 18</h3>','<p>O pacote está embaixo da ponte que dá acesso a <i>Starfish Island</i>.</p>', 'package', -12.71, 22.65, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 19</h3>','<p>O pacote está atrás do escritório da <i>Spand Express Shipping Company (Spand-Ex)</i>. Este é o lugar onde da missão <i>Riot</i>.</p>', 'package', -4.99, 35.88, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 20</h3>','<p>O pacote está ao norte da <i>Spand-Ex</i> em um canteiro de obras, suba dois andares, o pacote está na viga de aço apontando para <i>Starfish Island</i>.</p>', 'package', -3.85, 32.94, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 21</h3>','<p>O pacote está no final da doca apontando para o club de golf <i>Leaf Links</i>.</p>', 'package', 1.63, 31.49, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 22</h3>','<p>O pacote está no topo do prédio com piscina no terraço, ao lado do edifício <i>Standing Vice Point</i>.</p>', 'package', 1.15, 44.06, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 23</h3>','<p>O pacote está no estacionamento por trás do <i>Malibu Club</i>.</p>', 'package', 5.35, 42.91, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 24</h3>','<p>Ao norte de <i>Malibu Club</i>, tem um prédio branco com azul e uma piscina no terraço, o pacote está localizado no topo prédio. É o mesmo prédio da missão <i>Treacherous Swine</i>.</p>', 'package', 8.72, 41.95, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 25</h3>','<p>No canto da piscina do Hotel <i>WK Chariot</i>.</p>', 'package', 8.94, 47.71, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 26</h3>','<p>O pacote está localizado dentro da pizzaria <i>The Well Stacked Pizza Co</i>.</p>', 'package', 11.14, 39.62, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 27</h3>','<p>O pacote está atrás da escada do bloco de apartamentos a leste do <i>The Well Stacked Pizza Co</i>.</p>', 'package', 12.26, 41.77, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 28</h3>','<p>O pacote está dentro da <i>Jewelry Story</i>.</p>', 'package', 15.51, 37.91, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 29</h3>','<p>O pacote está nos fundos da casa da <i>Mercedes</i>.</p>', 'package', 20.76, 33.99, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 30</h3>','<p>No outro lado da rua da casa da Mercedes, o pacote está localizado no topo do prédio <i>The Chase</i>.</p>', 'package', 19.94, 37.02, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 31</h3>','<p>O pacote está no canto do jardim de frente com o <i>Pay &apos;n&apos; Spray</i>.</p>', 'package', 25.49, 38.96, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 32</h3>','<p>Estando de frente com o hotel <i>Ducum Inn</i>, o pacote estará nos arbustos do lado esquerdo do hotel.</p>', 'package', 35.29, 29.91, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 33</h3>','<p>O pacote está na última plataforma de salto na piscina atrás do hotel <i>Ducum Inn</i>.</p>', 'package', 36.99, 34.91, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 34</h3>','<p>O pacote está embaixo da ponte que dá acesso a <i>Prawn Island</i>.</p>', 'package', 44.15, 32.63, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 35</h3>','<p>O pacote está atrás de uma placa com a propaganda da <i>Jocksport</i> na pista da <i>RC Bandit</i>.</p>', 'package', 40.92, 60.23, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 36</h3>','<p>O pacote está atrás do prédio que fica ao sul da safe house <i>3321 Vice Point</i>.</p>', 'package', 51.29, 46.96, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 37</h3>','<p>O pacote está entre as duas entradas do <i>North Point Mall</i>.</p>', 'package', 52.38, 39.31, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 38</h3>','<p>No segundo piso do shopping, na ala leste, o pacote está entre os dois cartazes de <i>SALE</i>.</p>', 'package', 49.90, 41.42, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 39</h3>','<p>O pacote está no segundo piso da loja <i>GASH</i>.</p>', 'package', 46.86, 38.52, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 40</h3>','<p>O pacote está no térreo do estacionamento do shopping.</p>', 'package', 51.29, 34.21, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 41</h3>','<p>O pacote está no final do beco sem saída.</p>', 'package', 43.27, 24.41, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 42</h3>','<p>O pacote está centrado entre duas escadarias no topo do escritório azul da <i>InterGlobal Studios</i>.</p>', 'package', 43.49, 19.71, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 43</h3>','<p>O pacote está dentro do <i>Stage C</i> do estúdio de filmes.</p>', 'package', 45.77, 20.11, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 44</h3>','<p>O pacote está atrás da mansão verde próxima da ponte que dá acesso a <i>Downtown</i>.</p>', 'package', 49.50, 17.60, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 45</h3>','<p>O pacote está dentro da casa amarela próxima da ponte que dá acesso a <i>Vice Point</i>.</p>', 'package', 49.24, 24.94, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 46</h3>','<p>O pacote está embaixo da ponte da <i>Leaf Links</i> atrás da casa da Mercedes.</p>', 'package', 17.61, 28.72, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 47</h3>','<p>Este pacote está localizado no estacionamento de carro de golf, no lado norte do campo de golf.</p>', 'package', 32.14, 23.88, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 48</h3>','<p>Siga a pista sinuosa do campo de golf e no final dela terá uma armadilha de areia, o pacote está sobre ela.</p>', 'package', 17.69, 18.70, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 49</h3>','<p>O pacote está localizado no meio de uma ilha aguada no lado sul do campo de golf.</p>', 'package', 6.54, 22.83, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 50</h3>','<p>O pacote está localizado na ponte no extremo sul do campo de golf.</p>', 'package', 0.14, 22.74, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 51</h3>','<p>Estando de frente com a mansão Vercetti, vá para esquerda até o final, o pacote está numa escadaria ao redor da piscina.</p>', 'package', -18.71, 9.34, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 52</h3>','<p>O pacote está localizado no beco entre a mansão Vercetti e a mansão do vizinho.</p>', 'package', -19.09, -1.86, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 53</h3>','<p>Encotre uma piscina da Rockstar, o pacote está no topo da varanda.</p>', 'package', -11.76, -4.19, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 54</h3>','<p>O pacote está na área da piscina numa casa no outro da rua da mansão Vercetti.</p>', 'package', -11.51, 7.23, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 55</h3>','<p>O pacote está na entrada da casa com uma bandeira americana nela.</p>', 'package', -7.69, 9.87, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 56</h3>','<p>No final da ponte, tem um edifício no lado direito da ponte, o pacote está atrás dele.</p>', 'package', 52.22, 9.25, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 57</h3>','<p>Vá para o prédio da <i>V.A.J Finance</i>, encontre uma escutulra de arte moderna, o pacote está no centro dela.</p>', 'package', 54.32, 0.64, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 58</h3>','<p>O pacote está em um beco sem saída próximo da garagem do <i>Hyman Condo</i>.</p>', 'package', 54.16, -15.17, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 59</h3>','<p>O pacote está no estacionamento atrás do <i>Hyman Memorial Stadium</i>.</p>', 'package', 57.14, -49.27, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 60</h3>','<p>No estacionamento subterrâneo do hospital <i>Schuman Health Care</i>.</p>', 'package', 49.39, -15.17, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 61</h3>','<p>Vá para o prédio da <i>VCN</i> sul da <i>V.A.J Financy</i>. Há uma entrada na parte frontal que o levará para o heliporto. Você verá o pacote escondido na beira do último piso abaixo do rampa.</p>', 'package', 49.50, 0.55, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 62</h3>','<p>Entre no escritório da <i>Mezzanine</i>, o pacote está dentro dele.</p>', 'package', 38.62, -4.45, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 63</h3>','<p>O pacote está próximo a uma rampa atrás do hotel <i>Moist PalmsM</i>.</p>', 'package', 26.12, -19.30, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 64</h3>','<p>Dentro do hangar vermelho do <i>Phil&apos;s Place</i>.</p>', 'package', 22.76, -26.77, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 65</h3>','<p>Por trás do <i>Phil&apos;s Place</i> e perto da água (no canto, olhando em direção ao estádio) você vai encontrar um pacote.</p>', 'package', 25.81, -31.08, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 66</h3>','<p>O pacote está numa escadaria que dá acesso ao subsolo, encontrada em um par de edifícios ao norte da <i>Kaufman Cabs</i>.</p>', 'package', 19.40, -23.26, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 67</h3>','<p>O pacote está numa escadaria atrás da <i>Kaufman Cabs</i>.</p>', 'package', 16.64, -23.70, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 68</h3>','<p>Procure um cartaz escrito <i>Jack Hammer Hall</i> por trás da <i>Kaufman Cabs</i>, o pacote está numa área afundada na casa de frente com cartaz.</p>', 'package', 17.32, -17.11, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 69</h3>','<p>No beco atrás da funerária Romero.</p>', 'package', 8.94, -25.46, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 70</h3>','<p>O pacote está no topo da casa.</p>', 'package', 1.77, -28.53, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 71</h3>','<p>No quintal do outdoor escrito <i>Little Haiti, Lifes a Beach</i>.</p>', 'package', -4.64, -24.05, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 72</h3>','<p>O pacote está dentro da lavanderia <i>Laundromats</i>.</p>', 'package', -7.42, -32.58, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 73</h3>','<p>Ao leste da lavanderia <i>Laundromats</i>, tem uma casa verde com uma placa escrita <i>For Sale</i>, o pacote está no topo da escada.</p>', 'package', -8.61, -30.82, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 74</h3>','<p>No outro lado da rua do <i>Cuban cafe</i>, tem um pacote atrás do pequeno muro de concreto.</p>', 'package', -18.59, -31.70, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 75</h3>','<p>Perto do <i>Cafe Robina</i>, tem um outdoor da <i>Kaufman Cabs</i>, o pacote está no topo dele.</p>', 'package', -19.54, -28.71, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 76</h3>','<p>O pacote está dentro da <i>Calleggi Delicatessen Restaurant and Donut Shop</i>.</p>', 'package', -20.74, -17.33, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 77</h3>','<p>O pacote está no topo do prédio.</p>', 'package', -24.07, -32.44, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 78</h3>','<p>O pacote está no segundo piso da <i>Sunshine Autos Showroom</i>.</p>', 'package', -30.47, -24.62, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 79</h3>','<p>O pacote está entre os tanques de gasolina.</p>', 'package', -33.96, -27.35, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 80</h3>','<p>O pacote está entre dois trailers um azul e outro amarelo.</p>', 'package', -36.26, -32.18, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 81</h3>','<p>Nos prédios de apartamentos perto da entrada para o estaleiro, você verá um pacote em um pátio de concreto entre edifícios.</p>', 'package', -41.99, -14.69, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 82</h3>','<p>O pacote está dentro do navio perto do estaleiro.</p>', 'package', -47.41, -6.60, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 83</h3>','<p>O pacote está atrás da placa escrita <i>Vice City Port Authority Main Building</i>.</p>', 'package', -50.25, -16.45, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 84</h3>','<p>O pacote está no topo do navio ao sul de <i>Viceport</i>.</p>', 'package', -51.30, -25.76, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 85</h3>','<p>O pacote está no interior do escritório da doca.</p>', 'package', -46.27, -31.78, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 86</h3>','<p>Vá para o fim das docas, onde você está a garagem da <i>8-Ball</i>. Agora, vá para o norte para encontrar o pacote em uma porta distante.</p>', 'package', -42.41, -28.36, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 87</h3>','<p>O pacote está em cima do hangar.</p>', 'package', -46.55, -36.57, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 88</h3>','<p>O pacote está no Heliponto.</p>', 'package', -44.83, -41.72, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 89</h3>','<p>O pacote está em cima do hangar.</p>', 'package', -40.47, -36.05, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 90</h3>','<p>Em cima do teto de concreto na extremidade sul da ponte Causeway passageiros.</p>', 'package', -38.40, -39.56, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 91</h3>','<p>O pacote está em cima do avião.</p>', 'package', -36.97, -49.40, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 92</h3>','<p>O pacote está embaixo da asa do avião.</p>', 'package', -37.08, -49.63, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 93</h3>','<p>O pacote está embaixo da asa do avião da Rockstar, dentro de um hangar.</p>', 'package', -37.15, -58.06, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 94</h3>','<p>O pacote está atrás do hangar ao lado oeste do corpo de bombeiros do aeroporto.</p>', 'package', -30.89, -60.35, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 95</h3>','<p>O pacote está no canto noroeste dentro do terminal.</p>', 'package', -27.20, -48.18, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 96</h3>','<p>O pacote está em cima do Aeroporto Internacional <i>Escobar</i>.</p>', 'package', -30.39, -45.41, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 97</h3>','<p>O pacote está no fim do terminal 1-8.</p>', 'package', -31.97, -40.79, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 98</h3>','<p>Atrás dos outdoor.</p>', 'package', -16.96, -38.99, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 99</h3>','<p>O pacote está embaixo do avião.</p>', 'package', -11.68, -56.31, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Pacote Secreto 100</h3>','<p>O pacote está atrás do sinal <i>Fort Baxter Air Base</i> na entrada da base militar.</p>', 'package', -6.69, -56.17, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-1.png"],
			['<h3>Rampage 01</h3>','<p><span>Objetivo:</span> Destruir 10 veículos<br><span>Arma:</span> Rocket Launcher</p>', 'rampage', -57.60, 4.07, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 02</h3>','<p><span>Objetivo:</span> Matar 30 membros da gangue<br><span>Arma:</span> Molotov Cocktails</p>', 'rampage', -54.69, 30.83, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 03</h3>','<p><span>Objetivo:</span> Atropelar e matar 30 membros da gangue<br><span>Arma:</span> Pegue um bom veículo</p>', 'rampage', -54.97, 42.83, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 04</h3>','<p><span>Objetivo:</span> Matar 25 membros da gangue<br><span>Arma:</span> PSG-1</p>', 'rampage', -43.65, 24.95, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 05</h3>','<p><span>Objetivo:</span> Matar 25 membros da gangue<br><span>Arma:</span> Chainsaw</p>', 'rampage', -37.98, 23.66, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 06</h3>','<p><span>Objetivo:</span> Matar 10 membros da gangue<br><span>Arma:</span> Katana</p>', 'rampage', -40.43, 20.59, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 07</h3>','<p><span>Objetivo:</span> Matar 25 membros da gangue<br><span>Arma:</span> M4</p>', 'rampage', -38.40, 12.41, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 08</h3>','<p><span>Objetivo:</span> Matar 25 membros da gangue<br><span>Arma:</span> Shotgun</p>', 'rampage', -32.90, 19.97, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 09</h3>','<p><span>Objetivo:</span> Matar 25 membros da gangue<br><span>Arma:</span> MP5</p>', 'rampage', -16.87, 27.22, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 10</h3>','<p><span>Objetivo:</span> Matar 30 membros da gangue<br><span>Arma:</span> Spaz Shotgun</p>', 'rampage', -8.56, 47.40, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 11</h3>','<p><span>Objetivo:</span> Matar 10 membros da gangue<br><span>Arma:</span> PSG-1</p>', 'rampage', -3.19, 48.27, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 12</h3>','<p><span>Objetivo:</span> Atirar de dentro de um carro e matar 35 membros da gangue<br><span>Arma:</span> Uzi</p>', 'rampage', 9.07, 31.44, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 13</h3>','<p><span>Objetivo:</span> Matar 20 membros da gangue<br><span>Arma:</span> Chainsaw</p>', 'rampage', 18.82, 31.14, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 14</h3>','<p><span>Objetivo:</span> Matar 35 membros da gangue<br><span>Arma:</span> M4</p>', 'rampage', 49.56, 42.17, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 15</h3>','<p><span>Objetivo:</span> Matar 25 membros da gangue<br><span>Arma:</span> Colt Python</p>', 'rampage', 52.27, 47.26, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 16</h3>','<p><span>Objetivo:</span> Atirar de dentro do carro e matar 30 membros da gangue<br><span>Arma:</span> Uzi</p>', 'rampage', 50.15, 37.64, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 17</h3>','<p><span>Objetivo:</span> Matar 30 membros da gangue<br><span>Arma:</span> Rocket Launcher</p>', 'rampage', 55.53, 40.41, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 18</h3>','<p><span>Objetivo:</span> Matar 40 membros da gangue<br><span>Arma:</span> Molotov Cocktails</p>', 'rampage', 50.38, -1.81, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 19</h3>','<p><span>Objetivo:</span> Matar 25 membros da gangue<br><span>Arma:</span> Colt Python</p>', 'rampage', 50.99, -9.28, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 20</h3>','<p><span>Objetivo:</span> Matar 30 membros da gangue<br><span>Arma:</span> Minigun</p>', 'rampage', 53.80, 0.64, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 21</h3>','<p><span>Objetivo:</span> Matar 30 membros da gangue<br><span>Arma:</span> Flame Thrower</p>', 'rampage', 58.88, -28.18, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 22</h3>','<p><span>Objetivo:</span> Atire de dentro de um carro e mate 30 membros da gangue<br><span>Arma:</span> Uzi</p>', 'rampage', 37.72, -19.79, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 23</h3>','<p><span>Objetivo:</span> Matar 30 membros da gangue<br><span>Arma:</span> M60</p>', 'rampage', 31.81, -13.99, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 24</h3>','<p><span>Objetivo:</span> Matar 35 membros da gangue<br><span>Arma:</span> Spaz Shotgun</p>', 'rampage', 2.56, -34.55, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 25</h3>','<p><span>Objetivo:</span> Matar 30 membros da gangue<br><span>Arma:</span> Tec-9</p>', 'rampage', -0.77, -25.41, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 26</h3>','<p><span>Objetivo:</span> Matar 10 membros da gangue<br><span>Arma:</span> Katana</p>', 'rampage', -8.74, -23.39, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 27</h3>','<p><span>Objetivo:</span> Atropelar e matar 35 membros da gangue<br><span>Arma:</span> Escolha um bom veículo</p>', 'rampage', -11.76, -10.03, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 28</h3>','<p><span>Objetivo:</span> Matar 20 membros da gangue<br><span>Arma:</span> Sniper</p>', 'rampage', -14.76, -20.05, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 29</h3>','<p><span>Objetivo:</span> Matar 25 membros da gangue<br><span>Arma:</span> Shotgun</p>', 'rampage', -11.20, -30.95, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 30</h3>','<p><span>Objetivo:</span> Destroir 15 veículos<br><span>Arma:</span> Rocket Launcher</p>', 'rampage', -5.55, -48.09, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 31</h3>','<p><span>Objetivo:</span> Matar 20 membros da gangue<br><span>Arma:</span> Ruger</p>', 'rampage', -23.99, -31.56, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 32</h3>','<p><span>Objetivo:</span> Destroir 12 veículos<br><span>Arma:</span> Rocket Launcher</p>', 'rampage', -29.10, -43.96, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 33</h3>','<p><span>Objetivo:</span> Matar 25 membros da gangue<br><span>Arma:</span> Spaz Shotgun</p>', 'rampage', -31.45, -45.45, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 34</h3>','<p><span>Objetivo:</span> Matar 35 membros<br><span>Arma:</span> Grenades</p>', 'rampage', -42.57, -22.60, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Rampage 35</h3>','<p><span>Objetivo:</span> Destroir 15 veículos<br><span>Arma:</span> Rocket Launcher</p>', 'rampage', -47.33, -6.78, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-2.png"],
			['<h3>Ocean Beach Chopper Checkpoint</h3>','<p>Para iniciar a missão entre no Chopper que está no telhado do Apartmento 3C em Ocean Beach, seu objetivo é pegar todos os 17 checkpoints espalhados pelo mapa.</p><p><span>Recompensa:</span> <span class="sucess">$100,00</span></p>', 'checkpoint', -45.92, 21.64, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-3.png"],
			['<h3>Ocean Beach Cone Crazy</h3>','<p>A missão fica localizada no topo do parque de estacionamento em Ocean Beach, para iniciá-la basta entrar no Stallion, seu objetivo é pegar os 5 checkpoints sem bater em nenhum cone espalhados pela pista.</p><p><span>Recompensa:</span> <span class="sucess">$100,00</span></p>', 'checkpoint', -40.60, 26.96, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-3.png"],
			['<h3>PCJ Playground</h3>','<p>A missão está localizada ao sul de Vice Point, pouco antes de Washington Beach quase de frente com a ponte que dá acesso a missão Demolition Man. Para iniciar pegue a PCJ 600, que fica ao lado do edifício, seu objetivo é coletar os 24 checkpoints em menos de 2 minutos.</p><p><span>Recompensa:</span> <span class="sucess">$100,00</span></p>', 'checkpoint', -6.73, 43.40, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-3.png"],
			['<h3>Vice Point Chopper Checkpoint</h3>','<p>Do outro lado da rua a leste de Links View Apartment em uma área de gramado aberta, seu objetivo é coletar os 17 checkpoints</p><p><span>Recompensa:</span> <span class="sucess">$100,00</span></p>', 'checkpoint', 21.99, 37.55, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-3.png"],
			['<h3>RC Bandit</h3>','<p>A missão está localizado ao norte da praia, em Vice Point. Para iniciar a missão entre na Van estacionada ao lado da pista de corrida, seu objetivo é chegar em 1º Lugar.</p><p><span>Recompensa:</span> <span class="sucess">$100,00</span></p>', 'checkpoint', 36.36, 51.26, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-3.png"],
			['<h3>RC Baron</h3>','<p>A missão está localizada no estacionamento do North Point Mall, que fica em Vice Point. Para iniciar, entre na Van estacionada no último andar, Seu objetivo é ficar em primeiro lugar contra os outros três RC Baron coletando 28 Checkpoints.</p><p><span>Recompensa:</span> <span class="sucess">$100,00</span></p>', 'checkpoint', 53.41, 34.91, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-3.png"],
			['<h3>Checkpoint Corridas</h3>','<h4>Test Track:</h4><p>Fica localizada na área verde de Downtown, para iniciá-la, entre na Landstalker estacionada de frente com a pista, seu objetivo é concluir o trajeto.</p><p><span>Recompensa:</span> <span class="sucess">$100,00</span></p><h4>Trial by Dirt:</h4><p>Fica localizada na área verde de Downtown, para iniciá-la, pegue a Sanchez estacionada de frente com a pista, seu objetivo é concluir o trajeto.</p><p><span>Recompensa:</span> <span class="sucess">$100,00</span></p>', 'checkpoint', 58.13, 1.56, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-3.png"],
			['<h3>Hyman Memorial Stadium</h3>','<h4>Dirt Ring:</h4><p>Seu objetivo é coletar todos os checkpoints rosas espalhados pelo circuito com a Sanchez.</p><p><span class="pl-20">Recompensa:</span> <span class="sucess">$10.000,00</span> (antes de 10 minutos)<br><span class="pl-20">Recompensa:</span> <span class="sucess">$5.000,00</span> (depois de 10 minutos)</p></p><h4>Hot Ring:</h4><p>Seu objetivo é ficar entre os três primeiros lugares dirigindo um Hotring Racer em um circuito oval de 12 voltas.</p><p><span class="pl-20">Recompensa:</span> 1º Lugar - <span class="sucess">$5.000,00</span><br><span class="pl-20">Recompensa:</span> 2º Lugar - <span class="sucess">$1.500,00</span><br><span class="pl-20">Recompensa:</span> 3º Lugar - <span class="sucess">$500,00</span></p><h4>Blood Ring:</h4><p>Seu objetivo é bater o seu tempo alvo coletando os checkpoints amarelos do circuito dirigindo um Bloodring Banger, cada vez que você passar por um checkpoint seu tempo aumentará até que se atinja o tempo alvo.</p><p><span class="pl-20">Recompensa:</span> <span class="sucess">$1.000,00</span><br><span class="pl-20">Bônus:</span> <span class="sucess">$100,00</span> por cada oponente derrotado por você.</p>', 'checkpoint', 55.68, -27.74, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-3.png"],
			['<h3>Downtown Chopper Checkpoint</h3>','<p>No leste do edifício da sede VCPD, disponível depois que a missão G-Spotlight estiver concluída, seu objetivo é coletar todos os 29 checkpoints espalhados pela cidade.</p><p><span>Recompensa:</span> <span class="sucess">$100,00</span></p>', 'checkpoint', 41.05, -4.54, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-3.png"],
			['<h3>Little Haiti Chopper Checkpoint</h3>','<p>Em cima do telhado de um restaurante que tem um outdoor escrito "Move Over Miami MARK" por trás do Kaufman Cabs, seu objetivo é coletar todos os 22 checkpoints espalhados pela cidade.</p><p><span>Recompensa:</span> <span class="sucess">$100,00</span></p>', 'checkpoint', 17.48, -19.30, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-3.png"],
			['<h3>Vice Street Racer</h3>','<p>As corridas ficam disponíveis depois de adquirir o "Sunshine Autos Car Showroom". Para iniciar uma corrida, vá até o piso inferior da Sunshine Autos e pare sobre uma marca rosa, agora é só escolher uma corrida. Seu objetivo é ficar em primeiro lugar, são quatro concorrentes ao todo e a recompensa para o vencedor é o valor da aposta somado de cada concorrente. O lema de Vice Street Racer é "Ganhe Dinheiro, não Kudos".</p><h4>Race 1: Terminal Velocity</h4><p><span class="pl-20">Comprimento:</span> 1.1 Miles<br><span class="pl-20">Aposta:</span> $100,00<br><span class="pl-20">Recompensa:</span> <span class="sucess">$400,00</span></p><h4>Race 2: Ocean Drive</h4><p><span class="pl-20">Comprimento:</span> 1.652 Miles<br><span class="pl-20">Aposta:</span> $500,00<br><span class="pl-20">Recompensa:</span> <span class="sucess">$2.000,00</span></p><h4>Race 3: Border Run</h4><p><span class="pl-20">Comprimento:</span> 1.926 Miles<br><span class="pl-20">Aposta:</span> $1.000,00<br><span class="pl-20">Recompensa:</span> <span class="sucess">$4.000,00</span></p><h4>Race 4: Capital Cruise</h4><p><span class="pl-20">Comprimento:</span> 2.438 Miles<br><span class="pl-20">Aposta:</span> $2.000,00<br><span class="pl-20">Recompensa:</span> <span class="sucess">$8.000,00</span></p><h4>Race 5: V.C. Tour!</h4><p><span class="pl-20">Comprimento:</span> 2.86 Miles<br><span class="pl-20">Aposta:</span> $5.000,00<br><span class="pl-20">Recompensa:</span> <span class="sucess">$20.000,00</span></p><h4>Race 6: V.C. Endurance</h4><p><span class="pl-20">Comprimento:</span> 6.1 Miles<br><span class="pl-20">Aposta:</span> $10.000,00<br><span class="pl-20">Recompensa:</span> <span class="sucess">$40.000,00</span></p>', 'checkpoint', -29.25, -22.38, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-3.png"],
			['<h3>RC Raider Pickup</h3>','<p>Para iniciar a missão entre em uma Van estacionado na entrada do Terminal de carga do "Escobar International Airport" O objetivo é coletar todos os 20 checkpoints controlando um Helicóptero RC Raider.</p><p><span>Recompensa:</span> <span class="sucess">$100,00</span></p>', 'checkpoint', -42.99, -34.42, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-3.png"],
			['<h3>Checkpoint Charlie</h3>','<p>Está missão estará disponível após a compra do Estaleiro em Viceport. Para iniciá-la, entre no Squalo ou no Cuban Jetmax, seu objetivo é coletar todos os pacotes espalhados antes que o tempo termine.</p><p><span>Recompensa:</span> <span class="sucess">$5.000,00</span></p>', 'checkpoint', -51.93, -6.74, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-3.png"],
			['<h3>Loja 01 - Bunch of Tools</h3>','<p><span>Bunch of Tools</span> é uma loja de ferramentas lolizada próxima ao prédio em construção da missão <i>demolition man</i>.</p>', 'shop', -14.25, 29.77, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-4.png"],
			['<h3>Loja 02 - Jewelry Story</h3>','<p><span>Jewelry Story</span> é uma joalheria ao norte seguindo na rua do restaurante pizzaria, <i>The Well Stacked Pizza Co</i>.</p>', 'shop', 16.18, 38.34, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-4.png"],
			['<h3>Loja 03 - Dispensary</h3>','<p><span>Dispensary</span> é uma farmácia localizado ao norte da safe house <i>El Swanko Casa</i>.</p>', 'shop', 37.97, 37.20, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-4.png"],
			['<h3>Loja 04 - Corner Story</h3>','<p><span>Corner Story</span> é um supermercado localizado ao norte da safe house <i>El Swanko Casa</i>.</p>', 'shop', 38.83, 40.19, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-4.png"],
			['<h3>Loja 05 - GASH</h3>','<p><span>GASH</span> é uma loja de roupas localizada no piso inferior do <i>The North Point Mall</i>.</p>', 'shop', 47.61, 39.74, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-4.png"],
			['<h3>Loja 06 - Tooled Up</h3>','<p><span>Tooled Up</span> é uma loja de ferramentas localizada no piso inferior do <i>The North Point Mall</i>.</p>', 'shop', 48.40, 37.64, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-4.png"],
			['<h3>Loja 07 - Vinyl Countdown</h3>','<p><span>Vinyl Countdown</span> é uma loja de músicas localizada no <i>The North Point Mall</i>.</p>', 'shop', 49.61, 37.20, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-4.png"],
			['<h3>Loja 08 - Family Jewels</h3>','<p><span>Family Jewels</span> é uma joalheria localizado no piso inferior do <i>The North Point Mall</i>.</p>', 'shop', 52.35, 41.24, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-4.png"],
			['<h3>Loja 09 - Jewle&apos;r</h3>','<p><span>Jewle&apos;r</span> é uma joalheria localizada na avenida de frente com a <i>Rock City</i>.</p>', 'shop', 41.08, -17.72, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-4.png"],
			['<h3>Loja 10 - Dispensary</h3>','<p><span>Dispensary</span> é uma farmácia localizada à direita da <i>Rock City</i>.</p>', 'shop', 37.90, -16.89, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-4.png"],
			['<h3>Loja 11 - Ryton Aide</h3>','<p><span>Ryton Aide</span> é uma farmácia localizada próxima ao <i>Pay &apos;n&apos; Spray</i> de Little Haiti.</p>', 'shop', 3.61, -17.19, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-4.png"],
			['<h3>Loja 12 - Laundromats</h3>','<p><span>Laundromats</span> é uma lavanderia localizada em Little Havana.</p>', 'shop', -7.61, -32.58, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-4.png"],
			['<h3>Loja 13 - Café Robina</h3>','<p><span>Café Robina</span> é uma cafeteria localizada em Little Havana.</p>', 'shop', -19.71, -31.52, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-4.png"],
			['<h3>Loja 14 - Screw This</h3>','<p><span>Screw This</span> é uma loja de ferramentas localizada em Little Havana.</p>', 'shop', -22.82, -22.69, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-4.png"],
			['<h3>Loja 15 - Calleggi Delicatessen Restaurant and Donut Shop</h3>','<p><span>Calleggi Delicatessen Restaurant and Donut Shop</span> é um restaurante e lanchonete, localizada entre <i>Cherry Popper Ice</i> e a delegacia de polícia de Little Havana.</p>', 'shop', -21.19, -16.89, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-4.png"],
			['<h3>Salto Único 1</h3>','<p>Assista ao vídeo com a localização do salto.</p> <p><button class="btn btn-primary fancybox fancybox.iframe" href="https://www.youtube.com/embed/W-LHZEG0Rtw">Assistir Vídeo</button></p>', 'jump', -44.33, 6.44, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 2</h3>','<p>Assista ao vídeo com a localização do salto.</p> <p><button class="btn btn-primary fancybox fancybox.iframe" href="https://www.youtube.com/embed/W-LHZEG0Rtw">Assistir Vídeo</button></p>', 'jump', -47.56, 6.48, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 3</h3>','<p>Em breve o vídeo.</p>', 'jump', -43.41, 21.03, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 4</h3>','<p>Em breve o vídeo.</p>', 'jump', -46.58, 21.56, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 5</h3>','<p>Em breve o vídeo.</p>', 'jump', -43.50, 25.07, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 6</h3>','<p>Em breve o vídeo.</p>', 'jump', -40.77, 30.43, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 7</h3>','<p>Em breve o vídeo.</p>', 'jump', -33.85, 22.43, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 8</h3>','<p>Em breve o vídeo.</p>', 'jump', -33.93, 29.99, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 9</h3>','<p>Em breve o vídeo.</p>', 'jump', -33.31, 31.97, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 10</h3>','<p>Em breve o vídeo.</p>', 'jump', -24.23, 37.29, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 11</h3>','<p>Em breve o vídeo.</p>', 'jump', -16.49, 41.90, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 12</h3>','<p>Em breve o vídeo.</p>', 'jump', -15.77, 41.16, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 13</h3>','<p>Em breve o vídeo.</p>', 'jump', -9.99, 41.64, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 14</h3>','<p>Em breve o vídeo.</p>', 'jump', -15.14, 33.29, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 15</h3>','<p>Em breve o vídeo.</p>', 'jump', -14.63, 32.32, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 16</h3>','<p>Em breve o vídeo.</p>', 'jump', -7.48, 39.75, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 17</h3>','<p>Em breve o vídeo.</p>', 'jump', -4.28, 34.87, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 18</h3>','<p>Em breve o vídeo.</p>', 'jump', 2.47, 40.19, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 19</h3>','<p>Em breve o vídeo.</p>', 'jump', 42.98, 22.48, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 20</h3>','<p>Em breve o vídeo.</p>', 'jump', 50.99, -9.28, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 21</h3>','<p>Em breve o vídeo.</p>', 'jump', 50.60, -16.80, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 22</h3>','<p>Em breve o vídeo.</p>', 'jump', 40.69, -2.82, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 23</h3>','<p>Em breve o vídeo.</p>', 'jump', 49.73, 6.48, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 24</h3>','<p>Em breve o vídeo.</p>', 'jump', 18.82, -19.52, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 25</h3>','<p>Em breve o vídeo.</p>', 'jump', 5.97, -24.71, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 26</h3>','<p>Em breve o vídeo.</p>', 'jump', 1.85, -21.98, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 27</h3>','<p>Em breve o vídeo.</p>', 'jump', -17.79, -26.20, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 28</h3>','<p>Em breve o vídeo.</p>', 'jump', -6.12, 4.55, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 29</h3>','<p>Em breve o vídeo.</p>', 'jump', -25.70, -39.39, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 30</h3>','<p>Em breve o vídeo.</p>', 'jump', -32.31, -33.67, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 31</h3>','<p>Em breve o vídeo.</p>', 'jump', -37.70, -49.76, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 32</h3>','<p>Em breve o vídeo.</p>', 'jump', -36.44, -48.09, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 33</h3>','<p>Em breve o vídeo.</p>', 'jump', -35.37, -40.88, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 34</h3>','<p>Em breve o vídeo.</p>', 'jump', -43.18, -48.53, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Salto Único 35</h3>','<p>Em breve o vídeo.</p>', 'jump', -44.51, -50.99, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-5.png"],
			['<h3>Life 1</h3>','<p>O coração está na entrada das docas de <i>Ocean Beach</i> perto do Pier 1.</p>', 'health', -40.37, 10.66, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 2</h3>','<p>O coração está na frente do hospital de <i>Ocean View</i>.</p>', 'health', -33.71, 15.75, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 3</h3>','<p>O coração está no telhado da <i>Wok & Roll</i>.</p>', 'health', -13.91, 41.33, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 4</h3>','<p>O coração está ao lado da lixeira.</p>', 'health', 27.22, 37.64, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 5</h3>','<p>O coração está no hospital de <i>Vice Point</i>.</p>', 'health', 35.75, 41.95, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 6</h3>','<p>O coração está dentro da farmácia <i>Dispensary</i>.</p>', 'health', 38.21, 37.99, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 7</h3>','<p>O coração está dentro do grande copo de milkshake, encontrado dento do shopping.</p>', 'health', 52.32, 37.95, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 8</h3>','<p>O coração está perto do chafariz da <i>Prawn Island</i>.</p>', 'health', 49.87, 21.60, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 9</h3>','<p>O coração está na pista de corrida.</p>', 'health', 57.87, -0.71, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 10</h3>','<p>O coração está no telhado da <i>Ammu-Nation</i> de <i>Downtown</i>.</p>', 'health', 53.93, -9.59, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 11</h3>','<p>Existem dois corações, um no telhado do hospital de <i>Downtown</i> e outro na entrada.</p>', 'health', 50.26, -16.32, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 12</h3>','<p>O coração está dentro da farmácia <i>Dispensary</i>.</p>', 'health', 37.70, -16.52, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 13</h3>','<p>O coração está no topo da máquina.</p>', 'health', 11.27, -37.50, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 14</h3>','<p>O coração está atrás do ferro felho.</p>', 'health', 9.63, -30.11, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 15</h3>','<p>O coração está dentro da <i>Ryton Aide</i>.</p>', 'health', 4.66, -17.11, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 16</h3>','<p>O coração está na frente do hospital de <i>Little Havana</i>.</p>', 'health', -14.46, -18.56, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 17</h3>','<p>O coração está no telhado ao lado sula da <i>Cherry Poppers</i>.</p>', 'health', -20.70, -20.80, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 18</h3>','<p>O coração está no segundo piso do aeroporto internacional <i>Escobar</i>.</p>', 'health', -29.75, -43.25, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 19</h3>','<p>O coração está em baixo da primeira ponte que dá acesso ao navio depois da entrada.</p>', 'health', -44.80, -10.34, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 20</h3>','<p>O coração está no lado direito do estaleiro de <i>Viceport</i>.</p>', 'health', -51.52, -8.71, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 21</h3>','<p>O coração está na entrada da <i>Starfish Island</i>.</p>', 'health', -16.07, -14.47, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 22</h3>','<p>O coração está dentro do primeiro quarto à direita, ao entrar na mansão Vercetti pela porta principal.</p>', 'health', -17.07, 2.48, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 23</h3>','<p>O coração está dentro do primeiro quarto à esquerda, ao entrar na mansão Vercetti pela porta dos fundos.</p>', 'health', -18.34, 6.00, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Life 24</h3>','<p>Na ponte dentro <i>Leaf Links Island</i>.</p>', 'health', 24.65, 24.72, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-6.png"],
			['<h3>Pílula de Adrenalina 1</h3>','<p>A pílula está no primeiro piso, atrás da escada oeste em manutenção do shopping <i>Washington Mall</i>.</p>', 'pill', -33.05, 19.18, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-7.png"],
			['<h3>Pílula de Adrenalina 2</h3>','<p>A pílula está no começo da viela.</p>', 'pill', -12.06, 42.03, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-7.png"],
			['<h3>Pílula de Adrenalina 3</h3>','<p>A pílula está atrás do estacionamento do <i>Malibu Club</i>.</p>', 'pill', 7.50, 40.94, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-7.png"],
			['<h3>Pílula de Adrenalina 4</h3>','<p>A pílula está na varanda do apartamento.</p>', 'pill', 16.90, 40.06, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-7.png"],
			['<h3>Pílula de Adrenalina 5</h3>','<p>A pílula está dentro da farmácia <i>Dispensary</i>.</p>', 'pill', 38.04, 37.99, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-7.png"],
			['<h3>Pílula de Adrenalina 6</h3>','<p>A pílula está perto da entrada sul do shopping <i>Vice Point Mall</i>.</p>', 'pill', 44.25, 39.70, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-7.png"],
			['<h3>Pílula de Adrenalina 7</h3>','<p>A pílula está no outro lado da rua da <i>VCN</i> ao lado da ponte <i>North Bridge</i>.</p>', 'pill', 48.17, 3.71, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-7.png"],
			['<h3>Pílula de Adrenalina 8</h3>','<p>A pílula está no telhado da <i>Ammu-Nation</i> de <i>Downtown</i>.</p>', 'pill', 53.70, -11.22, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-7.png"],
			['<h3>Pílula de Adrenalina 9</h3>','<p>A pílula está dentro da farmácia <i>Dispensary</i>.</p>', 'pill', 37.70, -16.65, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-7.png"],
			['<h3>Pílula de Adrenalina 10</h3>','<p>A pílula está embaixo da escadaria atrás do prédio.</p>', 'pill', 12.60, -19.04, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-7.png"],
			['<h3>Pílula de Adrenalina 11</h3>','<p>A pílula está na escada da sapataria de frente com a <i>The Well Stacked Pizza Co</i>.</p>', 'pill', 11.92, -28.36, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-7.png"],
			['<h3>Pílula de Adrenalina 12</h3>','<p>A pílula está na garagem da casa rosa de frente com a sucata do ônibus escolar.</p>', 'pill', 4.31, -22.47, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-7.png"],
			['<h3>Pílula de Adrenalina 13</h3>','<p>A pílula está dentro da <i>Ryton Aide</i>.</p>', 'pill', 4.66, -17.41, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-7.png"],
			['<h3>Pílula de Adrenalina 14</h3>','<p>A pílula está atrás da casa do lado do outdoor <i>EXPLODER</i>.</p>', 'pill', -17.25, -25.28, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-7.png"],
			['<h3>Pílula de Adrenalina 15</h3>','<p>A pílula está no jardim de frente com a escadaria da mansão Vercetti.</p>', 'pill', -15.14, 3.76, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-7.png"],
			['<h3>Pílula de Adrenalina 16</h3>','<p>A pílula está no telhado, próximo ao heliponto da mansão Vercetti.</p>', 'pill', -19.00, 4.86, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-7.png"],
			['<h3>Colete 1</h3>','<p>Dentro da safe house do apartamento do <i>Ocean View Hotel</i> (recompensa dos 10 pacotes secretos).</p>', 'vest', -44.89, 30.96, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 2</h3>','<p>O colete está no topo da escaria de um estacionamento encontrado atrás do <i>Pay &apos;n&apos; Spray</i> de <i>Ocean Beach</i>.</p>', 'vest', -43.76, 21.29, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 3</h3>','<p>O colete pode ser encontrado próximo a uma piscina atrás do prédio rosa perto do <i>Washington Mall</i>.</p>', 'vest', -29.98, 29.82, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 4</h3>','<p>O colete está no canto do prédio em construção da missão <i>demolition man</i>.</p>', 'vest', -8.56, 27.53, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 5</h3>','<p>O colete está na entrada do <i>Vice Standing Point</i>.</p>', 'vest', -0.95, 44.41, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 6</h3>','<p>O colete está perto da quadra de basketball.</p>', 'vest', 13.67, 39.66, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 7</h3>','<p>O colete está na piscina da casa ao sul da safe house <i>El Swanko Casa</i>.</p>', 'vest', 29.08, 39.22, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 8</h3>','<p>O colete está no topo da rampa do prédio azul com branco ao note do hotel <i>Ducum Inn</i>.</p>', 'vest', 42.62, 36.85, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 9</h3>','<p>O coelte está no lado do prédio que fica ao sul da safe house <i>3321 Vice Point</i>.</p>', 'vest', 52.27, 45.11, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 10</h3>','<p>O colete está no telhado da casa.</p>', 'vest', 56.17, -4.67, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 11</h3>','<p>O colete está no terraço da safe house <i>Hyman Condo</i> (recompensa dos 10 pacotes secretos).</p>', 'vest', 55.78, -15.74, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 12</h3>','<p>O colete está numa casa no outro lado da rua de frente com o estúdio de cinemas <i>InterGlobal Films</i>.</p>', 'vest', 44.47, 22.83, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 13</h3>','<p>O colete está no estacionamento do <i>Rock City</i>.</p>', 'vest', 37.45, -20.01, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 14</h3>','<p>O colete está na garagem atrás da <i>The Greasy Choppper</i>.</p>', 'vest', 33.66, -7.04, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 15</h3>','<p>O colete está no telhado da <i>Print Works</i>.</p>', 'vest', -4.20, -26.91, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 16</h3>','<p>O colete está localizado na vila de <i>Little Havana</i>.</p>', 'vest', -13.09, -32.05, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 17</h3>','<p>No topo da guarita leste do <i>Fort Baxter Air Base</i>.</p>', 'vest', -6.21, -54.55, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 18</h3>','<p>O colete está entre os containers azul e amarelo.</p>', 'vest', -31.86, -31.74, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 19</h3>','<p>O colete está na entrada da casa de frente com a primeira rampa que dá acesso ao navio.</p>', 'vest', -45.23, -12.01, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 20</h3>','<p>O colete está dentro do primeiro quarto à direita, ao entrar na mansão Vercetti pela porta principal.</p>', 'vest', -16.87, 2.48, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 21</h3>','<p>O colete está dentro do primeiro quarto à esquerda, ao entrar na mansão Vercetti pela porta dos fundos.</p>', 'vest', -18.34, 5.80, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 22</h3>','<p>O colete está no jardim de frente com a entrada da mansão Vercetti (recompensa dos 10 pacotes secretos).</p>', 'vest', -17.46, 7.27, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Colete 23</h3>','<p>O colete está sobre uma armadilha de areia no club de golf.</p>', 'vest', 28.74, 17.78, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-8.png"],
			['<h3>Estrela 1</h3>','<p>A estrela está nas entre as lojas do subsolo.</p>', 'star', -45.94, 25.99, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-9.png"],
			['<h3>Estrela 2</h3>','<p>A estrela está na viela, atrás no primeiro conjunto de prédios de frente para a praia.</p>', 'star', -21.93, 38.61, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-9.png"],
			['<h3>Estrela 3</h3>','<p>A estrela está atrás do prédio ao lado do canal.</p>', 'star', 4.57, 38.47, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-9.png"],
			['<h3>Estrela 4</h3>','<p>A estrela está no gramado de frente com a pizzaria <i>The Well Stacked Pizza Co</i>.</p>', 'star', 10.24, 41.95, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-9.png"],
			['<h3>Estrela 5</h3>','<p>A estrela está no beco de frente com a safe house <i>Links View Apartment</i>.</p>', 'star', 22.88, 38.04, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-9.png"],
			['<h3>Estrela 6</h3>','<p>A estela está perto da entrada sul do shopping <i>Vice Point Mall</i>.</p>', 'star', 45.49, 39.40, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-9.png"],
			['<h3>Estrela 7</h3>','<p>A estrela está na primeira rua à esquerda depois da ponte <i>North Bridge</i>.</p>', 'star', 42.62, 24.94, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-9.png"],
			['<h3>Estrela 8</h3>','<p>A estrela está de frente com a safe house <i>Hyman Condo</i>.</p>', 'star', 54.88, -16.05, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-9.png"],
			['<h3>Estrela 9</h3>','<p>A estrela está pairando acima da rua, entre os containers.</p>', 'star', 18.24, -19.52, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-9.png"],
			['<h3>Estrela 10</h3>','<p>A estrela está ao lado do prédio com o outdoor <i>B.M.T Burger</i>.</p>', 'star', 9.67, -23, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-9.png"],
			['<h3>Estrela 11</h3>','<p>A estrela está pairando sobre o canal.</p>', 'star', 2.03, -21.02, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-9.png"],
			['<h3>Estrela 12</h3>','<p>A estrela está no beco entre os prédio com o outdoor da Rockstar e Sunshine Autos.</p>', 'star', -19.83, -25.32, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-9.png"],
			['<h3>Estrela 12</h3>','<p>A estrela está pairando no ar, atrás da <i>Sunshine Autos</i>.</p>', 'star', -28.87, -19.66, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-9.png"],
			['<h3>Ocean View Hotel</h3>','<p><span>Localização:</span> Ocean Beach<br><span>Preço:</span> Grátis<br><span>Garagem:</span> Não</p>', 'home', -44.80, 31.27, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-10.png"],
			['<h3>Ocean Heights Apartment</h3>','<p><span>Localização:</span> Ocean Beach<br><span>Preço:</span> $7.000,00<br><span>Garagem:</span> 1</p>', 'home', -52.90, 21.03, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-10.png"],
			['<h3>1102 Washington Street</h3>','<p><span>Localização:</span> Washington Beach<br><span>Preço:</span> $3.000,00<br><span>Garagem:</span> Não</p>', 'home', -27.67, 24.98, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-10.png"],
			['<h3>Links View Apartment</h3>','<p><span>Localização:</span> Vice Point<br><span>Preço:</span> $6.000,00<br><span>Garagem:</span> 1</p>', 'home', 22.92, 34.39, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-10.png"],
			['<h3>El Swanko Casa</h3>','<p><span>Localização:</span> Vice Point<br><span>Preço:</span> $8.000,00<br><span>Garagem:</span> 1</p>', 'home', 32.40, 39.92, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-10.png"],
			['<h3>3321 Vice Point</h3>','<p><span>Localização:</span> Vice Point<br><span>Preço:</span> $2.000,00<br><span>Garagem:</span> Não</p>', 'home', 53.91, 44.58, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-10.png"],
			['<h3>Skumole Shack</h3>','<p><span>Localização:</span> Downtown<br><span>Preço:</span> $1.000,00<br><span>Garagem:</span> Não</p>', 'home', 35.75, -4.19, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-10.png"],
			['<h3>Hyman Condo</h3>','<p><span>Localização:</span> Downtown<br><span>Preço:</span> $14.000,00<br><span>Garagem:</span> 8<br><span>Heliponto:</span> 1</p>', 'home', 55.08, -16.32, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-10.png"],
			['<h3>Vercetti Estate</h3>','<p><span>Localização:</span> Starfish Island<br><span>Preço:</span> Grátis<br><span>Garagem:</span> 2<br><span>Heliponto:</span> 1</p>', 'home', -17.54, 3.71, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-10.png"],
			['<h3>Vercetti Estate</h3>','<p><span>Preço:</span> Grátis<br><span>Recompensa diária:</span> $5.000,00<br><span>Missões:</span><ul><li>Death Row</li><li>Rub Out</li><li>Shakedown</li><li>Bar Brawl</li><li>Copland</li></ul></p>', 'property', -17.54, 3.71, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-11.png"],
			['<h3>Printworks</h3>','<p><span>Preço:</span> $70.000,00<br><span>Recompensa diária:</span> $8.000,00<br><span>Missões:</span><ul><li>Spilling the Beans</li><li>Hit the Courier</li></ul></p>', 'property', -5.34, -26.77, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-11.png"],
			['<h3>Boatyard</h3>','<p><span>Preço:</span> $10.000,00<br><span>Recompensa diária:</span> $2.000,00<br><span>Missões:</span><ul><li>Checkpoint Charlie</li></ul></p>', 'property', -50.95, -8.14, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-11.png"],
			['<h3>Cherry Poppers Ice Cream Factory</h3>','<p><span>Preço:</span> $20.000,00<br><span>Recompensa diária:</span> $3.000,00<br><span>Missões:</span><ul><li>Distribution</li></ul></p>', 'property', -18.30, -17.72, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-11.png"],
			['<h3>Pole Position Club</h3>','<p><span>Preço:</span> $30.000,00<br><span>Recompensa diária:</span> $4.000,00<br><span>Missões:</span><ul><li>Pole Position Club</li></ul></p>', 'property', -50.56, 24.72, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-11.png"],
			['<h3>Kaufman Cabs Taxi Firm</h3>','<p><span>Preço:</span> $40.000,00<br><span>Recompensa diária:</span> $5.000,00<br><span>Missões:</span><ul><li>VIP</li><li>Friendly Rivalry</li><li>Cabmaggedon</li></ul></p>', 'property', 15.29, -23.96, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-11.png"],
			['<h3>Sunshine Autos Car Showroom</h3>','<p><span>Preço:</span> $50.000,00<br><span>Recompensa diária:</span> $9.000,00<br><span>Missões:</span><ul><li>Lista de carros 1</li><li>Lista de carros 2</li><li>Lista de carros 3</li><li>Lista de carros 4</li></ul></p>', 'property', -30.58, -24.31, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-11.png"],
			['<h3>Porn Empire: Inter Global Films</h3>','<p><span>Preço:</span> $60.000,00<br><span>Recompensa diária:</span> $7.000,00<br><span>Missões:</span><ul><li>Recruitment</li><li>Dildo Dodo</li><li>Martha&apos;s Mugshot</li><li>G-Spotlight</li></ul></p>', 'property', 44.59, 19.36, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-11.png"],
			['<h3>Malibu Club</h3>','<p><span>Preço:</span> $120.000,00<br><span>Recompensa diária:</span> $10.000,00<br><span>Missões:</span><ul><li>No Escape?</li><li>The Shootist</li><li>The Driver</li><li>The Job</li></ul></p>', 'property', 3.61, 42.91, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-11.png"],
			['<h3>Faca</h3>','<p>A arma está no beco, atrás da <i>Maison Wenifall</i>.</p>', 'gun', -52.58, 26.52, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Pistola</h3>','<p>A arma está de frente com pier.</p>', 'gun', -46.36, 11.54, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Uzi 9m</h3>','<p>A arma está atrás do <i>Pay &apos;n&apos; Spray</i>.</p>', 'gun', -44.58, 22, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Taco de Baseball</h3>','<p>A arma está no beco, atrás do <i>Ocean View Hotel</i>.</p>', 'gun', -44.29, 29.86, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Soco Inglês</h3>','<p>A arma está no beco, atrás do <i>Moonute Hotel</i>.</p>', 'gun', -42.47, 30.30, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Escopeta</h3>','<p>A arma está no terraço do shopping.</p>', 'gun', -34.07, 22.96, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Uzi 9mm</h3>','<p>A arma atrás do prédio rosa perto do <i>Washington Mall</i></p>', 'gun', -31.34, 27.53, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Granada</h3>','<p>A arma está no estacionamento da delegacia de polícia.</p>', 'gun', -15.27, 36.67, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Cassetete</h3>','<p>A arma está dentro da delegacia, no primeiro escritório à esquerda.</p>', 'gun', -14.20, 38.83, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Escopeta</h3>','<p>A arma está atrás do banco.</p>', 'gun', -12.62, 45.59, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Machete</h3>','<p>A arma está na ao lado da ponte.</p>', 'gun', -13.65, 22.39, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Pistola</h3>','<p>A arma está no térreo do prédio em construção.</p>', 'gun', -3.71, 35.75, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Tec-9</h3>','<p>A arma está atrás da casa.</p>', 'gun', 9.80, 33.60, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Faca de Açogueiro</h3>','<p>A arma está no drive-thru da pizzaria.</p>', 'gun', 11.57, 38.91, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Taco de Golf</h3>','<p>A arma está dentro do club de golf.</p>', 'gun', 19.61, 25.20, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Ruger</h3>','<p>A arma está no telhado da casa atrás da safe house <i>El Swanko Casa</i>.</p>', 'gun', 32.00, 39.49, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Uzi 9mm</h3>','<p>A arma está na varanda da casa.</p>', 'gun', 50.43, 21.73, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>M4</h3>','<p>A arma está dentro do estúdio <i>Stage B</i>.</p>', 'gun', 46.53, 19.53, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Coquetel Molotov</h3>','<p>A arma está de frente com o <i>Mars Cafe</i>, atrás das mesas.</p>', 'gun', 54.27, -18.51, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Uzi 9mm</h3>','<p>A arma está de baixo das escadas que levam ao <i>Skumole Shack</i>.</p>', 'gun', 35.61, -3.53, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Stubby Escopeta</h3>','<p>A arma está atrás do galpão.</p>', 'gun', 15.16, -37.58, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Minigun</h3>','<p>A arma está no telhado da casa da missão <i>Trojan Voodoo</i>.</p>', 'gun', 12.69, -32.84, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>M4</h3>','<p>A arma está entre as casas.</p>', 'gun', 12.82, -22.91, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Colt Python</h3>','<p>A arma está no beco, ao lado da casa.</p>', 'gun', 4.70, -32.44, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Serra Elétrica</h3>','<p>A arma está no centro da quadra de basketball.</p>', 'gun', -14.20, -20.58, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>M-60</h3>','<p>A arma está no topo da guarita.</p>', 'gun', -6.21, -54.46, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>M4</h3>','<p>A arma está atrás das casas.</p>', 'gun', -21.84, -33.72, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Stubby Escopeta</h3>','<p>A arma está atrás do cartaz de surf.</p>', 'gun', -21.84, -33.72, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Sniper Rifle</h3>','<p>A arma está na plataforma oeste.</p>', 'gun', -33.71, -12.27, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Lança Foguetes</h3>','<p>A arma está na piscina.</p>', 'gun', -41.56, -23.87, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Lança-Chamas</h3>','<p>A arma está no fim da rua.</p>', 'gun', -48.27, -23.70, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Ingram Mac 10</h3>','<p>A arma está atrás da pequena cerca.</p>', 'gun', -50.78, -11.22, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Lança-Chamas</h3>','<p>A arma está na piscina da Rockstar.</p>', 'gun', -11.16, -3.53, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Katana</h3>','<p>A arma está na garagem.</p>', 'gun', -16.83, -4.05, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Sniper Rifle</h3>','<p>A arma está no labirinto.</p>', 'gun', -17.75, -0.71, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Colt Python</h3>','<p>A arma está dentro do primeiro quarto à direita, ao entrar na mansão Vercetti pela porta principal.</p>', 'gun', -16.70, 2.44, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>M4 / Shotgun</h3>','<p>A arma está dentro do primeiro quarto à esquerda, ao entrar na mansão Vercetti pela porta dos fundos.</p>', 'gun', -18.42, 6.09, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Serra Elétrica</h3>','<p>A arma está dentro do apartamento.</p>', 'gun', -46.67, 22.17, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Katana</h3>','<p>A arma está dentro do shopping.</p>', 'gun', 46.35, 41.16, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-12.png"],
			['<h3>Ammu-Nation - Ocean Beach</h3>','<p>Itens:<ul><li>Colt 45 ($100,00)</li><li>Ingram Mac 10 ($300,00)</li><li>Pump-Action Shotgun ($500,00)</li><li>Ruger ($1.000,00)</li><li>Colete ($200,00)</li></ul></p>', 'ammu', -51.00, 17.69, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-13.png"],
			['<h3>Ammu-Nation - North Point Mall</h3>','<p>Itens:<ul><li>Colt 45 ($100,00)</li><li>Uzi 9mm ($400,00)</li><li>Stubby Shotgun ($500,00)</li><li>Sniper Rifle ($1.500,00)</li><li>Grenades ($300,00)</li><li>Colete ($200,00)</li></ul></p>', 'ammu', 48.52, 37.73, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-13.png"],
			['<h3>Ammu-Nation - Downtown</h3>','<p>Itens:<ul><li>Colt Python ($2.000,00)</li><li>MP5 ($3.000,00)</li><li>Spaz Shotgun ($4.000,00)</li><li>M4 ($5.000,00)</li><li>PSGI ($6.000,00)</li><li>Colete ($200,00)</li></ul></p>', 'ammu', 51.89, -9.90, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-13.png"],
			['<h3>Bunch of Tools - Washington Beach</h3>','<p>Itens:<ul><li>Screwdriver($10,00)</li><li>Hammer ($20,00)</li><li>Meat Cleaver ($50,00)</li><li>Baseball Bat ($80,00)</li><li>Machete ($100,00)</li></ul></p>', 'hardware', -14.25, 29.77, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-14.png"],
			['<h3>Bunch of Tools - North Point Mall</h3>','<p>Itens:<ul><li>Screwdriver ($10,00)</li><li>Hammer ($20,00)</li><li>Meat Cleaver ($50,00)</li><li>Knife ($90,00)</li><li>Katana ($300,00)</li></ul></p>', 'hardware', 48.75, 37.73, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-14.png"],
			['<h3>Bunch of Tools - Little Havana</h3>','<p>Itens:<ul><li>Screwdriver ($10,00)</li><li>Hammer ($20,00)</li><li>Meat Cleaver ($50,00)</li><li>Machete ($100,00)</li><li>Chainsaw ($500,00)</li></ul></p>', 'hardware', -22.82, -22.69, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-14.png"],
			['<h3>Roupa de Rua</h3>','<p>Dentro do quarto na safe house <i>Ocean View Hotel</i> em ocean beach.</p>', 'clothes', -44.80, 31.27, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-15.png"],
			['<h3>Mr. Vercetti</h3>','<p>Localizada na frente da <i>Collar & Cuffs</i>.</p>', 'clothes', -44.20, 27.93, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-15.png"],
			['<h3>Soiree</h3>','<p>Localizada na frente da <i>Rafaels</i>.</p>', 'clothes', -40.30, 25.25, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-15.png"],
			['<h3>Roupa de Rua e Frankie</h3>','<p>Localizada dentro da mansão Vercetti.</p>', 'clothes', -17.54, 3.71, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-15.png"],
			['<h3>Farda da Polícia</h3>','<p>Localizada dentro da delegacia, no primeiro escritório à esquerda.</p>', 'clothes', -14.08, 38.87, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-15.png"],
			['<h3>Bank Job</h3>','<p>Localizada dentro do andar de cima do <i>Malibu Club</i>.</p>', 'clothes', 4.14, 42.56, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-15.png"],
			['<h3>Country Club</h3>','<p>Localizada na frente do club de golf.</p>', 'clothes', 18.24, 26.04, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-15.png"],
			['<h3>Roupa Casual</h3>','<p>Localizada no <i>North Point Mall</i> na loja de roupas <i>GASH</i>.</p>', 'clothes', 47.61, 39.74, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-15.png"],
			['<h3>Roupa de Jardineiro</h3>','<p>Localizada no <i>North Point Mall</i> na loja de ferramentas <i>Tooled Up</i>.</p>', 'clothes', 48.40, 37.64, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-15.png"],
			['<h3>Roupa de Rua</h3>','<p>Localizada no terraço do <i>Hyman Condo</i>.</p>', 'clothes', 55.78, -15.54, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-15.png"],
			['<h3>Tracksuit Vermelha</h3>','<p>Localizada na <i>Jocksports</i>.</p>', 'clothes', 42.36, -20.62, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-15.png"],
			['<h3>Tracksuit Preta</h3>','<p>Localizada na lavanderia <i>Laundromats</i>.</p>', 'clothes', -7.61, -32.58, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-15.png"],
			['<h3>Havana</h3>','<p>Localizada dentro da loja.</p>', 'clothes', -11.89, -25.32, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-15.png"],
			['<h3>Pay &apos;n&apos; Spray</h3>','<p>Localizada em Ocean Beach.</p>', 'paynspray', -44.51, 20.59, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-16.png"],
			['<h3>Pay &apos;n&apos; Spray</h3>','<p>Localizada em Vice Point.</p>', 'paynspray', 25.89, 35.53, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-16.png"],
			['<h3>Pay &apos;n&apos; Spray</h3>','<p>Localizada em Little Haiti</p>', 'paynspray', 2.12, -17.90, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-16.png"],
			['<h3>Pay &apos;n&apos; Spray</h3>','<p>Localizada em Little Havana, na garagem da <i>Sunshine Autos</i>.</p>', 'paynspray', -29.75, -23.61, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-16.png"],
			['<h3>Pay &apos;n&apos; Spray</h3>','<p>Localizada em Vice Port</p>', 'paynspray', -44.64, -19.66, 4, "https://dl.dropboxusercontent.com/u/69995561/temp/HTML/gfx/iconMap-16.png"]
			
			
			];
	var infowindow = new google.maps.InfoWindow();
    var marker, i;
    for (i = 0; i < locations.length; i++) {  
			marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][3], locations[i][4]),
			map: map,
			icon: locations[i][6]
		});
		markers.push(marker);
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				infowindow.setContent(locations[i][0]+"<br />"+locations[i][1]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
	// shows all markers
	function show() {
		for(var j = 0; j<arguments.length; j++){
		  for (var i=0; i<locations.length; i++) {
			if (locations[i][2] == arguments[j]) {
				markers[i].setVisible(true);
			}
		  }
		}
	}
	// hides all markers
	function hide() {
		for(var j = 0; j<arguments.length; j++){
		  for (var i=0; i<locations.length; i++) {
			if (locations[i][2] == arguments[j]) {
				markers[i].setVisible(false);
			}
		  }
		}
	}
	// show or hide the categories initially
	hide("package","rampage","checkpoint","shop","jump","pill","health","vest","star","home","property","gun","ammu","hardware","paynspray","clothes");
	
	// toggle hide/show categories
	$("*").click(function(){
		var cat = $(this).attr("value");
		if ($(this).is(":checked")) {
			show(cat);
		}
		else {
			hide(cat);
		}
	});	
	// END - Checkbox markers	
}
	// #### END Map ####
	// Tooltip
	$(document).ready(function() {
		$('.iconTooltip').hover(function(){
			var title = $(this).attr('title');
			$(this).data('tipText', title).removeAttr('title');
			$('<p class="tooltip"></p>')
			.text(title)
			.appendTo('body')
			.fadeIn('slow');
		}, function() {
			$(this).attr('title', $(this).data('tipText'));
			$('.tooltip').remove();
		}).mousemove(function(e) {
			var mousex = e.pageX + 20;
			var mousey = e.pageY + 10;
			$('.tooltip')
			.css({ top: mousey, left: mousex })
		});
	});