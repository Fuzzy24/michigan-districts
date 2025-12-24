// This script downloads the Michigan district GeoJSON files
// Run this locally to download the data files

const datasets = {
  congress: 'https://opendata.arcgis.com/api/v3/datasets/54edc5b8c1c54de39421e858998a6b31_0/downloads/data?format=geojson&spatialRefId=4326',
  senate: 'https://opendata.arcgis.com/api/v3/datasets/57b305b758524fe58a9b9a5d9fdc5391_0/downloads/data?format=geojson&spatialRefId=4326',
  house: 'https://opendata.arcgis.com/api/v3/datasets/eb526146d0c64f8d9c52c9e60e018cf3_0/downloads/data?format=geojson&spatialRefId=4326'
};

async function downloadFile(url, filename) {
  console.log(`Downloading ${filename}...`);
  const response = await fetch(url);
  const data = await response.json();
  
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  
  console.log(`✓ Downloaded ${filename}`);
}

async function downloadAll() {
  for (const [type, url] of Object.entries(datasets)) {
    await downloadFile(url, `${type}.geojson`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 sec between downloads
  }
  console.log('All files downloaded!');
}

// Auto-run when page loads
if (typeof window !== 'undefined') {
  downloadAll();
}
