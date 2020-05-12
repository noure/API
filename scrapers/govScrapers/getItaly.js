const axios = require('axios');
const logger = require('../../utils/logger');
const csvUtils = require('../../utils/csvUtils');

const url = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni-latest.csv';

const italyData = async () => {
	let italyResponse;
	try {
		italyResponse = await axios.get(url);
		const parsedItalyData = await csvUtils.parseCsvData(italyResponse.data);
		return parsedItalyData.map((row) => ({ 
			updated: Date.now(),
			region: row.denominazione_regione,
			lat: row.lat,
			long: row.long,
			hospitalizedWithSymptoms: parseInt(row.ricoverati_con_sintomi),
			intensiveCare: parseInt(row.terapia_intensiva),
			totalHospitalized: parseInt(row.totale_ospedalizzati),
			homeIsolation: parseInt(row.isolamento_domiciliare),
			newCases: parseInt(row.nuovi_positivi),
			totalCases: parseInt(row.totale_casi),
			recovered: parseInt(row.dimessi_guariti),
			deaths: parseInt(row.deceduti)
		}));
	} catch (err) {
		logger.err(err, 'Error: Requesting Italy Gov Data failed!');
		return null;
	}
};

module.exports = italyData;
