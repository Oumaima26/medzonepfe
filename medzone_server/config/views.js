const wado = require('./wado');
const qidoStudy = require('./qido_study');
const qidoSeries = require('./qido_series');
const qidoInstances = require('./qido_instances');
const patients = require('./patients');
const buildResponse = require('./buildResponse');
const returnValueFromVR = require('./returnValueFromVR');
const btoa = require('./btoa');
const getBulkDataURI = require('./getBulkDataURI');
const tags = require('./viewTags');

function stringifyViewWithDependencies(func, tags2put) {
  return `
    function(doc) {
        ${tags2put ? `var ${tags2put} = ${JSON.stringify(tags[tags2put])};` : ''}
        ${btoa.toString()}
        ${getBulkDataURI.toString()}
        ${returnValueFromVR.toString()}
        ${buildResponse.toString()}
        ${func.toString()}

      return applyView(doc);
    }
  `;
}

module.exports.views = {
  wado_metadata: {
    map: stringifyViewWithDependencies(wado),
  },
  patients: {
    map: stringifyViewWithDependencies(patients, 'patientTags'),
    reduce: '_count',
  },
  qido_study: {
    map: stringifyViewWithDependencies(qidoStudy, 'studyTags'),
    reduce: '_count',
  },
  qido_series: {
    map: stringifyViewWithDependencies(qidoSeries, 'seriesTags'),
    reduce: '_count',
  },
  qido_instances: {
    map: stringifyViewWithDependencies(qidoInstances, 'instanceTags'),
    reduce: '_count',
  },
};
