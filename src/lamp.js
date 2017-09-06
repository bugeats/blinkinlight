import React from 'react';

const PALLETE = {
    space: '#403784',
    stars: '#BDE2EC'
};

// -----------------------------------------------------------------------------

class Lamp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accel: 0,
            angle: 90,
            posX: 300,
            posY: 200,
            turbulence: 0
        };

        setInterval(() => this.tick(), 0.06);
    }

    tick() {
        const { lit } = this.props;
        const { state } = this;

        const turbulence = state.turbulence + (0.002 * state.accel);
        const angle = 0 + (Math.sin(turbulence) * 33);

        const accel = lit
            ? state.accel + 0.02
            : Math.max(0, state.accel - 0.02);

        const nX = Math.sin(2 * Math.PI * (angle / 360));
        const nY = Math.cos(2 * Math.PI * (angle / 360));

        const posX = state.posX + (nX * accel);
        const posY = state.posY - (nY * accel);

        this.setState({
            accel,
            angle,
            posX,
            posY,
            turbulence
        });
    }

    render() {
        return (
          <LampContainer containerHeight={ 420 } containerWidth={ 420 }>
            <StarField depthFactor={ (3/4) } posX={ this.state.posX } posY={ this.state.posY }/>
            <StarField depthFactor={ (2/4) } posX={ this.state.posX } posY={ this.state.posY }/>
            <StarField depthFactor={ (1/4) } posX={ this.state.posX } posY={ this.state.posY }/>
            <Guy lit={ this.props.lit } angle={ this.state.angle } width={ 300 } height={ 300 }/>
          </LampContainer>
        );
    }
}

const LampContainer = ({
    children,
    containerHeight,
    containerWidth
}) => {
    const style = {
        position: 'relative',
        margin: 'auto',
        height: `${ containerHeight }px`,
        width: `${ containerWidth }px`,
        borderRadius: `${ containerHeight }px`,
        overflow: 'hidden',
        backgroundColor: `${ PALLETE.space }`,
        border: '1px solid #ccc'
    };
    return (
      <div className='lamp-container' style={style}>{ children }</div>
    );
};

const Guy = ({
    lit,
    width,
    height,
    angle
}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: `${ width }px`,
        height: `${ height }px`,
        zIndex: '1000',
        marginLeft: `-${ width * 0.5 }px`,
        marginTop: `-${ height * 0.5 }px`,
        transform: `rotate(${ angle }deg)`
    };
    return (
      <div className='guy' style={style}>
        <svg width="100%" height="100%" viewBox="0 0 260 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" fill="none" fill-rule="evenodd">
            <g id="logo_glyph" transform="translate(131.500000, 157.500000) rotate(15.000000) translate(-131.500000, -157.500000) translate(38.000000, 71.000000)">
              <g id="body" fill={ PALLETE.stars }>
                <path d="M97.499569,0.6224138 C99.443534,0.7646552 101.932759,0.7172414 104.303448,1.2150862 C106.863793,1.7603448 109.353017,2.7323277 111.818534,3.6568967 C114.023276,4.486638 114.75819,6.4780172 115.256034,8.587931 C116.559914,14.1590518 117.8875,19.7301723 119.143966,25.325 C119.618103,27.4349139 120.850862,28.5728449 122.842241,29.1892241 C133.937069,32.6030172 145.031897,36.087931 156.126724,39.5017241 C159.777586,40.6396551 162.812069,42.4887931 165.01681,45.7603449 C167.529741,49.5060343 170.350862,53.0146551 173.006034,56.6418102 C173.930603,57.8982759 175.044828,58.7280172 176.585776,58.9176723 C178.69569,59.2021551 180.568534,60.0318967 182.488793,60.9564656 C185.665517,62.4737069 186.969397,64.749569 185.618103,69.1590518 C185.001724,71.174138 183.745259,72.857328 181.825,73.853017 C176.206466,76.768966 170.587931,77.314224 164.921983,73.900431 C162.835776,72.643966 161.697845,70.8422413 161.50819,68.5189656 C161.318534,66.2668102 160.156897,65.2948277 158.07069,64.6784482 C148.706466,61.9284482 139.389655,59.0362069 130.049138,56.2150861 C126.943534,55.2668102 126.469397,55.7409482 127.180603,58.9176723 C127.370259,59.7237069 127.654741,60.5297413 127.702155,61.3594828 C127.844397,63.9435343 129.219397,65.7689656 131.021121,67.5232759 C136.971552,73.307759 142.850862,79.163362 148.659052,85.066379 C149.773276,86.20431 150.745259,87.555603 151.456466,88.978017 C154.941379,95.900431 158.355172,102.846552 161.697845,109.816379 C162.503879,111.499569 163.665517,112.424138 165.467241,112.590086 C168.786207,112.898276 171.678448,114.273276 174.404741,116.146121 C176.988793,117.924138 178.07931,120.413362 178.150431,123.518966 C178.340086,130.82069 173.26681,136.249569 166.984483,138.122414 C160.915517,139.947845 155.107328,139.355172 149.796983,135.63319 C148.184914,134.495259 147.07069,133.025431 146.45431,131.176293 C145.126724,127.335776 145.245259,123.756034 147.853017,120.318534 C150.247414,117.165517 150.105172,117.046983 147.402586,114.202155 C137.706466,104.00819 128.010345,93.814224 118.314224,83.643966 C116.180603,81.39181 115.398276,81.225862 112.790517,82.885345 C107.503879,86.228017 101.885345,88.812069 95.958621,90.684914 C89.771121,92.652586 83.441379,94.051293 76.9219828,94.240948 C75.8551723,94.264655 74.7883621,94.359483 73.7215518,94.45431 C71.7301723,94.667672 71.0900861,95.189224 70.7107759,97.180603 C69.8099139,101.708621 68.9327587,106.260345 68.1030172,110.788362 C66.9176723,117.307759 65.7797413,123.850862 64.6181033,130.393966 C63.9543102,134.163362 63.3142241,137.932759 62.650431,141.725862 C62.2474139,144.096552 62.4844828,144.594397 64.6655172,145.613793 C64.9262931,145.732328 65.1633621,145.874569 65.4241379,145.969397 C69.8573277,147.557759 71.5168102,151.256034 72.3465518,155.404741 C72.6073277,156.756034 72.2991379,158.368103 71.8012931,159.671983 C69.5965518,165.314224 65.4478449,169.107328 59.8293102,171.288362 C57.4823277,172.189224 55.0642241,172.900431 52.4564656,172.781897 C46.2689656,172.521121 42.0965518,169.368103 39.5362069,163.89181 C38.4456897,161.592241 38.825,159.245259 39.8681033,157.01681 C41.361638,153.792672 43.3530172,150.876724 46.2689656,148.790517 C47.8573277,147.652586 48.3788792,146.253879 48.1181033,144.309914 C47.1224138,136.913362 46.1978449,129.493103 45.3918102,122.072845 C45.1784482,120.034052 45.1784482,117.853017 45.5814656,115.861638 C47.2409482,107.421983 49.0663792,99.006034 50.8918102,90.590086 C51.2711208,88.88319 51.1762931,87.365948 50.3702587,85.777586 C49.6353449,84.378879 49.1375,82.861638 48.5448277,81.415517 C47.6913792,79.32931 46.8616379,79.163362 45.3681033,80.893966 C39.9392241,87.223707 34.5577587,93.577155 29.1525861,99.930603 C27.587931,101.756034 26.0706897,103.628879 24.4823277,105.45431 C23.5340518,106.544828 23.3918102,107.682759 24.0318967,108.962931 C24.3637931,109.626724 24.7668102,110.314224 24.8853449,111.025431 C25.075,112.021121 25.3594828,113.182759 25.0275861,114.0125 C24.2689656,115.932759 23.462931,118.018966 22.087931,119.465086 C18.3659482,123.424138 13.7905172,125.913362 8.1482759,125.652586 C4.3077586,125.486638 1.5103448,122.452155 0.4198276,119.228017 C0.1116379,118.350862 0.4198276,117.07069 0.8228448,116.169828 C1.8422414,113.988793 3.1935345,111.95 5.0900862,110.409052 C6.6310345,109.152586 7.3659483,107.611638 7.4607759,105.596552 C7.7215517,100.784052 8.2193966,95.971552 8.3853448,91.159052 C8.5038793,88.053448 9.6655172,85.51681 11.6094828,83.217241 C19.575,73.805603 27.5168102,64.3939656 35.5534482,55.0534482 C37.2840518,53.038362 37.7344828,51.1655172 36.7625,48.6762931 C34.6762931,43.3896551 32.8034482,38.0081897 30.8357759,32.674138 C29.9823277,30.350862 30.0534482,28.2172413 31.4521551,26.0362069 C33.4672413,22.9068967 36.0512931,20.4413792 39.0857759,18.3551723 C48.2840518,12.025431 58.5728449,8.1137931 69.1935343,5.0556033 C77.1827587,2.7560344 85.337931,1.2150862 93.659052,0.7883621 C94.773276,0.7409483 95.863793,0.6935345 97.499569,0.6224138 Z M163.381034,60.3875 C163.926293,60.0793102 164.874569,59.8659482 165.206466,59.2732759 C165.443534,58.8465518 165.040517,57.850862 164.6375,57.3056033 C162.219397,54.0340518 159.730172,50.8099138 157.288362,47.562069 C156.363793,46.3293102 155.178448,45.475862 153.684914,45.0017241 C145.909052,42.6073277 138.13319,40.212931 130.357328,37.8185343 C128.413362,37.225862 127.868103,37.7474138 128.294828,39.7625 C128.863793,42.3465518 129.503879,44.9068967 130.049138,47.5146551 C130.452155,49.4586208 131.542672,50.5728449 133.462931,51.1655172 C142.471552,53.9392241 151.480172,56.7840518 160.488793,59.6051723 C161.318534,59.8896551 162.19569,60.0793102 163.381034,60.3875 Z M15.3788792,96.825 C15.2603449,98.721552 15.0706898,100.594397 14.9758621,102.490948 C14.8810344,104.411207 15.8767241,105.075 17.5599139,104.103017 C18.3659482,103.652586 19.1008621,102.988793 19.6935344,102.277586 C26.2840518,94.45431 32.8271551,86.583621 39.3939657,78.760345 C40.3659482,77.598707 40.674138,76.318534 40.1525862,74.896121 C39.0857759,71.956466 37.9715518,69.0405172 36.8810344,66.124569 C36.8336208,65.9823277 36.7387931,65.8400861 36.6676723,65.6978449 C36.075,64.7021551 35.5534482,64.6073277 34.7,65.3896551 C34.462931,65.6030172 34.249569,65.8400861 34.0362069,66.0771551 C28.5836208,72.478017 23.1310344,78.878879 17.6784482,85.279741 C16.6827587,86.465086 16.1137931,87.816379 15.9952587,89.357328 C15.8293103,91.870259 15.5922413,94.335776 15.3788792,96.825 Z M52.1530172,120.660442 C52.2049999,120.677769 52.2396551,120.677769 52.2916378,120.695097 C52.3262927,121.128286 52.3436205,121.561475 52.3956029,121.994664 C52.8634472,126.20526 53.3312912,130.433184 53.8337902,134.643781 C54.1283589,137.190932 54.4749101,139.738083 54.8214612,142.267906 C54.9080989,142.857043 55.1506847,143.498163 55.8957697,143.394197 C56.6581821,143.290232 56.5888719,142.59713 56.5715445,142.007993 C56.554217,141.31489 56.4329239,140.604461 56.5368893,139.946014 C57.5418878,133.673438 58.5295585,127.418189 59.6558496,121.162941 C60.6781756,115.479502 61.9084321,109.848046 62.9480855,104.181934 C63.1213611,103.263574 62.9827408,102.22392 62.7228275,101.30556 C62.2549832,99.67677 61.5445534,98.117289 61.0247267,96.488499 C60.4355898,94.599795 59.6731774,92.728419 60.2623143,90.66644 C60.4355898,90.042647 60.7474857,89.106959 59.7944702,88.916356 C58.9107646,88.743081 58.7548168,89.696096 58.5988687,90.337216 C57.6458531,94.218589 56.6755099,98.117289 55.8264595,102.01599 C54.9600816,105.984001 54.2149966,109.986666 53.4352564,113.989332 C53.0020676,116.189932 52.5862063,118.425187 52.1530172,120.660442 Z M156.757328,113.488357 C156.673055,113.151268 156.639346,112.93216 156.555074,112.713052 C156.04944,111.49953 155.611224,110.2523 155.004463,109.072487 C153.049345,105.212814 150.959391,101.437414 149.071691,97.544032 C147.82446,94.948444 146.172723,92.723655 144.099624,90.717973 C139.63319,86.386375 135.251029,81.953651 130.818304,77.57149 C129.318256,76.088297 127.801355,74.655667 126.250744,73.223037 C125.795673,72.801676 125.172058,72.161206 124.582151,72.751112 C123.975391,73.374728 124.700133,73.947779 125.138349,74.369141 C125.981072,75.178156 126.53727,76.105151 126.84065,77.217546 C127.278866,78.902993 127.818209,80.55473 128.172153,82.257031 C128.610369,84.431257 129.250839,86.453793 131.25652,87.734733 C131.441919,87.852714 131.576755,88.038113 131.7453,88.206658 C134.779104,91.358443 137.880325,94.459665 140.846712,97.678868 C145.734507,102.954316 151.14479,107.791548 155.223571,113.791738 C155.274134,113.859155 155.324698,113.943428 155.392116,113.960282 C155.678642,114.0277 155.998877,114.196245 156.234839,114.111972 C156.487656,114.010846 156.622492,113.673756 156.757328,113.488357 Z" id="Combined-Shape"></path>
              </g>
              <path d="M156.757328,113.488357 C156.673055,113.151268 156.639346,112.93216 156.555074,112.713052 C156.04944,111.49953 155.611224,110.2523 155.004463,109.072487 C153.049345,105.212814 150.959391,101.437414 149.071691,97.544032 C147.82446,94.948444 146.172723,92.723655 144.099624,90.717973 C139.63319,86.386375 135.251029,81.953651 130.818304,77.57149 C129.318256,76.088297 127.801355,74.655667 126.250744,73.223037 C125.795673,72.801676 125.172058,72.161206 124.582151,72.751112 C123.975391,73.374728 124.700133,73.947779 125.138349,74.369141 C125.981072,75.178156 126.53727,76.105151 126.84065,77.217546 C127.278866,78.902993 127.818209,80.55473 128.172153,82.257031 C128.610369,84.431257 129.250839,86.453793 131.25652,87.734733 C131.441919,87.852714 131.576755,88.038113 131.7453,88.206658 C134.779104,91.358443 137.880325,94.459665 140.846712,97.678868 C145.734507,102.954316 151.14479,107.791548 155.223571,113.791738 C155.274134,113.859155 155.324698,113.943428 155.392116,113.960282 C155.678642,114.0277 155.998877,114.196245 156.234839,114.111972 C156.487656,114.010846 156.622492,113.673756 156.757328,113.488357 L156.757328,113.488357 L156.757328,113.488357 Z" id="Shape"></path>
              <path d="M52.1530172,120.660442 C52.2049999,120.677769 52.2396551,120.677769 52.2916378,120.695097 C52.3262927,121.128286 52.3436205,121.561475 52.3956029,121.994664 C52.8634472,126.20526 53.3312912,130.433184 53.8337902,134.643781 C54.1283589,137.190932 54.4749101,139.738083 54.8214612,142.267906 C54.9080989,142.857043 55.1506847,143.498163 55.8957697,143.394197 C56.6581821,143.290232 56.5888719,142.59713 56.5715445,142.007993 C56.554217,141.31489 56.4329239,140.604461 56.5368893,139.946014 C57.5418878,133.673438 58.5295585,127.418189 59.6558496,121.162941 C60.6781756,115.479502 61.9084321,109.848046 62.9480855,104.181934 C63.1213611,103.263574 62.9827408,102.22392 62.7228275,101.30556 C62.2549832,99.67677 61.5445534,98.117289 61.0247267,96.488499 C60.4355898,94.599795 59.6731774,92.728419 60.2623143,90.66644 C60.4355898,90.042647 60.7474857,89.106959 59.7944702,88.916356 C58.9107646,88.743081 58.7548168,89.696096 58.5988687,90.337216 C57.6458531,94.218589 56.6755099,98.117289 55.8264595,102.01599 C54.9600816,105.984001 54.2149966,109.986666 53.4352564,113.989332 C53.0020676,116.189932 52.5862063,118.425187 52.1530172,120.660442 L52.1530172,120.660442 L52.1530172,120.660442 Z" id="Shape"></path>
              <path d="M15.3788792,96.825 L15.3788792,96.825 C15.2603449,98.721552 15.0706898,100.594397 14.9758621,102.490948 C14.8810344,104.411207 15.8767241,105.075 17.5599139,104.103017 C18.3659482,103.652586 19.1008621,102.988793 19.6935344,102.277586 C26.2840518,94.45431 32.8271551,86.583621 39.3939657,78.760345 C40.3659482,77.598707 40.674138,76.318534 40.1525862,74.896121 C39.0857759,71.956466 37.9715518,69.0405172 36.8810344,66.124569 C36.8336208,65.9823277 36.7387931,65.8400861 36.6676723,65.6978449 C36.075,64.7021551 35.5534482,64.6073277 34.7,65.3896551 C34.462931,65.6030172 34.249569,65.8400861 34.0362069,66.0771551 C28.5836208,72.478017 23.1310344,78.878879 17.6784482,85.279741 C16.6827587,86.465086 16.1137931,87.816379 15.9952587,89.357328 C15.8293103,91.870259 15.5922413,94.335776 15.3788792,96.825 L15.3788792,96.825 L15.3788792,96.825 Z" id="Shape"></path>
              <path d="M163.381034,60.3875 C163.926293,60.0793102 164.874569,59.8659482 165.206466,59.2732759 C165.443534,58.8465518 165.040517,57.850862 164.6375,57.3056033 C162.219397,54.0340518 159.730172,50.8099138 157.288362,47.562069 C156.363793,46.3293102 155.178448,45.475862 153.684914,45.0017241 C145.909052,42.6073277 138.13319,40.212931 130.357328,37.8185343 C128.413362,37.225862 127.868103,37.7474138 128.294828,39.7625 C128.863793,42.3465518 129.503879,44.9068967 130.049138,47.5146551 C130.452155,49.4586208 131.542672,50.5728449 133.462931,51.1655172 C142.471552,53.9392241 151.480172,56.7840518 160.488793,59.6051723 C161.318534,59.8896551 162.19569,60.0793102 163.381034,60.3875 L163.381034,60.3875 L163.381034,60.3875 Z" id="Shape"></path>
              <path d="M97.499569,0.6224138 C99.443534,0.7646552 101.932759,0.7172414 104.303448,1.2150862 C106.863793,1.7603448 109.353017,2.7323277 111.818534,3.6568967 C114.023276,4.486638 114.75819,6.4780172 115.256034,8.587931 C116.559914,14.1590518 117.8875,19.7301723 119.143966,25.325 C119.618103,27.4349139 120.850862,28.5728449 122.842241,29.1892241 C133.937069,32.6030172 145.031897,36.087931 156.126724,39.5017241 C159.777586,40.6396551 162.812069,42.4887931 165.01681,45.7603449 C167.529741,49.5060343 170.350862,53.0146551 173.006034,56.6418102 C173.930603,57.8982759 175.044828,58.7280172 176.585776,58.9176723 C178.69569,59.2021551 180.568534,60.0318967 182.488793,60.9564656 C185.665517,62.4737069 186.969397,64.749569 185.618103,69.1590518 C185.001724,71.174138 183.745259,72.857328 181.825,73.853017 C176.206466,76.768966 170.587931,77.314224 164.921983,73.900431 C162.835776,72.643966 161.697845,70.8422413 161.50819,68.5189656 C161.318534,66.2668102 160.156897,65.2948277 158.07069,64.6784482 C148.706466,61.9284482 139.389655,59.0362069 130.049138,56.2150861 C126.943534,55.2668102 126.469397,55.7409482 127.180603,58.9176723 C127.370259,59.7237069 127.654741,60.5297413 127.702155,61.3594828 C127.844397,63.9435343 129.219397,65.7689656 131.021121,67.5232759 C136.971552,73.307759 142.850862,79.163362 148.659052,85.066379 C149.773276,86.20431 150.745259,87.555603 151.456466,88.978017 C154.941379,95.900431 158.355172,102.846552 161.697845,109.816379 C162.503879,111.499569 163.665517,112.424138 165.467241,112.590086 C168.786207,112.898276 171.678448,114.273276 174.404741,116.146121 C176.988793,117.924138 178.07931,120.413362 178.150431,123.518966 C178.340086,130.82069 173.26681,136.249569 166.984483,138.122414 C160.915517,139.947845 155.107328,139.355172 149.796983,135.63319 C148.184914,134.495259 147.07069,133.025431 146.45431,131.176293 C145.126724,127.335776 145.245259,123.756034 147.853017,120.318534 C150.247414,117.165517 150.105172,117.046983 147.402586,114.202155 C137.706466,104.00819 128.010345,93.814224 118.314224,83.643966 C116.180603,81.39181 115.398276,81.225862 112.790517,82.885345 C107.503879,86.228017 101.885345,88.812069 95.958621,90.684914 C89.771121,92.652586 83.441379,94.051293 76.9219828,94.240948 C75.8551723,94.264655 74.7883621,94.359483 73.7215518,94.45431 C71.7301723,94.667672 71.0900861,95.189224 70.7107759,97.180603 C69.8099139,101.708621 68.9327587,106.260345 68.1030172,110.788362 C66.9176723,117.307759 65.7797413,123.850862 64.6181033,130.393966 C63.9543102,134.163362 63.3142241,137.932759 62.650431,141.725862 C62.2474139,144.096552 62.4844828,144.594397 64.6655172,145.613793 C64.9262931,145.732328 65.1633621,145.874569 65.4241379,145.969397 C69.8573277,147.557759 71.5168102,151.256034 72.3465518,155.404741 C72.6073277,156.756034 72.2991379,158.368103 71.8012931,159.671983 C69.5965518,165.314224 65.4478449,169.107328 59.8293102,171.288362 C57.4823277,172.189224 55.0642241,172.900431 52.4564656,172.781897 C46.2689656,172.521121 42.0965518,169.368103 39.5362069,163.89181 C38.4456897,161.592241 38.825,159.245259 39.8681033,157.01681 C41.361638,153.792672 43.3530172,150.876724 46.2689656,148.790517 C47.8573277,147.652586 48.3788792,146.253879 48.1181033,144.309914 C47.1224138,136.913362 46.1978449,129.493103 45.3918102,122.072845 C45.1784482,120.034052 45.1784482,117.853017 45.5814656,115.861638 C47.2409482,107.421983 49.0663792,99.006034 50.8918102,90.590086 C51.2711208,88.88319 51.1762931,87.365948 50.3702587,85.777586 C49.6353449,84.378879 49.1375,82.861638 48.5448277,81.415517 C47.6913792,79.32931 46.8616379,79.163362 45.3681033,80.893966 C39.9392241,87.223707 34.5577587,93.577155 29.1525861,99.930603 C27.587931,101.756034 26.0706897,103.628879 24.4823277,105.45431 C23.5340518,106.544828 23.3918102,107.682759 24.0318967,108.962931 C24.3637931,109.626724 24.7668102,110.314224 24.8853449,111.025431 C25.075,112.021121 25.3594828,113.182759 25.0275861,114.0125 C24.2689656,115.932759 23.462931,118.018966 22.087931,119.465086 C18.3659482,123.424138 13.7905172,125.913362 8.1482759,125.652586 C4.3077586,125.486638 1.5103448,122.452155 0.4198276,119.228017 C0.1116379,118.350862 0.4198276,117.07069 0.8228448,116.169828 C1.8422414,113.988793 3.1935345,111.95 5.0900862,110.409052 C6.6310345,109.152586 7.3659483,107.611638 7.4607759,105.596552 C7.7215517,100.784052 8.2193966,95.971552 8.3853448,91.159052 C8.5038793,88.053448 9.6655172,85.51681 11.6094828,83.217241 C19.575,73.805603 27.5168102,64.3939656 35.5534482,55.0534482 C37.2840518,53.038362 37.7344828,51.1655172 36.7625,48.6762931 C34.6762931,43.3896551 32.8034482,38.0081897 30.8357759,32.674138 C29.9823277,30.350862 30.0534482,28.2172413 31.4521551,26.0362069 C33.4672413,22.9068967 36.0512931,20.4413792 39.0857759,18.3551723 C48.2840518,12.025431 58.5728449,8.1137931 69.1935343,5.0556033 C77.1827587,2.7560344 85.337931,1.2150862 93.659052,0.7883621 C94.773276,0.7409483 95.863793,0.6935345 97.499569,0.6224138 L97.499569,0.6224138 L97.499569,0.6224138 Z" id="Shape"></path>
              <path d="M106.168875,13.7846341 C104.811953,15.0854842 103.333516,16.2847053 101.733562,17.2806686 C96.285621,20.6547482 90.371871,23.0328645 84.336605,25.1060942 C75.2837072,28.2362644 66.0485353,30.5737295 56.5703331,31.9355567 C55.7399777,32.0371857 54.9096224,32.0981628 54.0590144,32.1591402 C53.2489117,32.2201176 52.438809,32.2607692 51.628706,32.3014208 C51.628706,32.362398 51.6084537,32.4437012 51.6084537,32.5250044 C49.2186503,32.3420724 46.8288472,32.1997918 44.4592965,31.9965341 C43.8112145,31.9355567 43.1226271,31.7526248 42.5353025,31.447738" id="Shape"></path>
            </g>
            <g id="antenae" transform="translate(115.000000, 14.000000)" fill={ PALLETE.stars }>
              <path d="M11.6052348,28.7110091 C4.98412992,27.3695486 0,21.5168273 0,14.5 C0,6.49187113 6.49187113,0 14.5,0 C22.5081289,0 29,6.49187113 29,14.5 C29,21.4993244 24.040704,27.3403432 17.4442819,28.7008864 L20,73 C20,73 18.5,75.1359372 14.5,75 C10.5,74.8640628 9,73 9,73 L11.6052348,28.7110091 Z" id="Combined-Shape"></path>
            </g>
            <circle id="bulb" fill={ lit ? '#FF0000' : PALLETE.stars } cx="129.5" cy="28.5" r="9.5"></circle>
          </g>
        </svg>
      </div>
    );
};

const StarField = ({
    children,
    depthFactor,
    posX,
    posY
}) => {
    const dpt = bound(depthFactor, 0, 1);
    const bgX = -(posX * dpt);
    const bgY = -(posY * dpt);
    const prc = (0 + (50 * dpt));
    const style = {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: `${ Math.round(dpt * 100) }`,
        backgroundImage: `url('data:image/svg+xml;base64,${ genStarBg(dpt) }')`,
        backgroundSize: `${ prc }%`,
        backgroundPosition: `${ bgX }px ${ bgY }px`
    };
    return (
      <div className='star-field' style={style}>{ children }</div>
    );
};


// Helpers ---------------------------------------------------------------------

function genStarBg(depthFactor) {
    const color = colorInterpolate(PALLETE.space, PALLETE.stars, depthFactor);
    return (btoa(`<?xml version="1.0" encoding="UTF-8"?>
      <svg width="174px" height="300px" viewBox="0 0 174 300" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke="none" fill="none">
          <g transform="translate(30.000000, 100.000000)">
            <polygon fill="${ color }" points="100 104.349127 93.2016261 107.923243 94.5 100.353143 89 94.9919678 96.6008131 93.887505 100 87 103.399187 93.887505 111 94.9919678 105.5 100.353143 106.798374 107.923243"></polygon>
          </g>
          <g transform="translate(-57.000000, -50.000000)">
            <polygon fill="${ color }" points="100 104.349127 93.2016261 107.923243 94.5 100.353143 89 94.9919678 96.6008131 93.887505 100 87 103.399187 93.887505 111 94.9919678 105.5 100.353143 106.798374 107.923243"></polygon>
          </g>
        </g>
      </svg>
    `));
}

function bound(n, min, max) {
    return Math.max(Math.min(max, n), min);
}

function colorInterpolate(color1, color2, factor) {
    const fa = bound(factor, 0, 1);
    const c1 = hexColorToRgb(color1);
    const c2 = hexColorToRgb(color2);
    const r = c1.r + ((c2.r - c1.r) * fa);
    const g = c1.g + ((c2.g - c1.g) * fa);
    const b = c1.b + ((c2.b - c1.b) * fa);
    return rgbToHex(r, g, b);
}

function hexColorToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Export ----------------------------------------------------------------------

export default Lamp;
