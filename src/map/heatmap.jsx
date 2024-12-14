import { useEffect, useMemo } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
export function Heatmap(props) {
  const map = useMap();
  const visualization = useMapsLibrary('visualization');

  const heatmap = useMemo(() => {
    if (!visualization) return null;
    return new google.maps.visualization.HeatmapLayer({
      data: [],
      radius: 40,
      opacity: 0.6 
    });
  }, [visualization]);
  
  // creates dataSet
  useEffect(() => {
    if (!heatmap) return;
    const dataSet = props.data.map(thing => ( {
      location: new google.maps.LatLng(thing.location.lat, thing.location.lng),
      weight: thing.weight
    }
    ));
    console.log('heatmap has', dataSet);
    
    heatmap.setData(dataSet);
    console.log('heatmap uses', heatmap.data)
    heatmap.setMap(map);
  }, [heatmap, map, props.data]); 

  return null;
}
