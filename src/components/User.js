import "./user.css";
import {useState} from 'react'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { PieChart } from 'react-minimal-pie-chart';
import { Link } from "react-router-dom";
import ProfileIcon from '../icons/Vector.svg'
import CalIcon from '../icons/date.svg'
import ArrowBox from '../icons/arrow-box.svg'
import ArrowExl from '../icons/arrow.svg'
import BellIcon from '../icons/bell.svg'
import PlusIcon from '../icons/Plus.svg'
import MinusIcon from '../icons/Minus.svg'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';




const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#333B44',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    padding:0,
    borderRadius: "6.4px"
  },
}));



export default function User(props) {

  const pC = props.ProteinConsumed;
  const cC = props.CarbConsumed;
  const fC = props.FatConsumed;
  const pT = props.ProteinTarget;
  const cT = props.CarbTarget;
  const fT = props.FatTarget;


  const dataMock = [
    { title: 'Protein', value: pC, color: '#F45C84' },
    { title: 'Carbs', value: cC, color: '#F5C90F' },
    { title: 'Fats', value: fC, color: '#03C7FC' },
  ];

  const [stepCount, setStepCount] = useState(props.StepsTarget);
  const [calorieCount, setCalorieCount] = useState(props.CalorieTarget);
  
  const stepIncrement = (() => {
    if(stepCount < 50000)
      setStepCount(stepCount+500);
  })

  const stepDecrement = (() => {
    if(stepCount > 0)
      setStepCount(stepCount-500);
  })

  const calorieIncrement = (() => {
    if(calorieCount <= 10000)
      setCalorieCount(calorieCount+100);
  })

  const calorieDecrement = (() => {
    if(calorieCount > 0)
      setCalorieCount(calorieCount-100);
  })


    
  let pM = new Date(props.PerformedDate).toLocaleString('en-us', { month: 'short' });
  let pD = String(new Date(props.PerformedDate).getDate()).padStart(2, '0');

  let sM = new Date(props.ScheduledDate).toLocaleString('en-us', { month: 'short' });
  let sD = String(new Date(props.ScheduledDate).getDate()).padStart(2, '0');
  
  let tD = String(new Date().getDate()).padStart(2, '0');
  let tM = new Date().toLocaleString('en-us', { month: 'short' });

  let perfDate = `${pD} ${pM}`;
  let schdDate = `${sD} ${sM}`;
  
  let checkDate = new Date() >= new Date(props.ScheduledDate) || `${tD} ${tM}` === schdDate;


  const Progressbar = ({bgcolor, consumed, header, targetAmount}) => {
     
    const Parentdiv = {
        position: 'relative',
        height: '10px',
        width: '100%',
        backgroundColor: '#101317',
        borderRadius: 40,
      }
      
      const progresstext = {
        position: 'absolute',
        left: `${1+(consumed/targetAmount)*100}%`,
        fontSize: '6px',
        color: bgcolor,
        fontWeight: 500
      }

      const Childdiv = {
        height: '100%',
        width: `${consumed/targetAmount*100}%`,
        backgroundColor: bgcolor,
        borderRadius:40,
        textAlign: 'right'
      }
      
      
      const headertext ={
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: 'white',
        fontSize: '10px',
      }

      const containerStyle = {
        padding:'5px 10px',
        background:'#1B222A',
        height:'29px',
        width:'176px',
        borderRadius:'4.8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }
        
    return (
    <div style={containerStyle}>
      <div style={headertext}>
        <span>{header}</span>
        <span>{targetAmount}g</span>
      </div>
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${consumed}g`}</span>
      </div>
    </div>
    </div>
    )
  }


  return (
    <>
    
    <div className="user">
      <img
        src="https://preview.redd.it/l0ergarfzst61.png?auto=webp&s=5de076eac09bb645d58b11cd8ce82f99ec487329"
        alt="dp"
      />
      <div className="usrname">
        <p>{props.Name}</p>
        <small>{props.Email}</small>
      </div>

      <div className="progressbar">
        <div className='text' style={{position:'absolute', left:'16px', top:'22.5px',color:'white', lineHeight:'10px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <p style={{fontWeight:700, fontSize:'12px', margin:0}}>{props.StepsWalked}</p>
          <small style={{fontWeight:500, fontSize:'8px', margin:0, color:'#BDBCBE'}}>walked</small>
        </div>

        <CircularProgressbar
          styles={buildStyles({
            pathColor: "#7FD18C"
          })}
          value={props.StepsWalked/stepCount*100}
        />

        <div className="usrname" style={{display:'flex', flexDirection:'column' ,alignItems:'center', lineHeight:'17px', letterSpacing:'0.5px', justifyContent:'center'}}>
          <img src={PlusIcon} alt='+' onClick={stepIncrement} style={{cursor:'pointer',borderRadius:0, height:'16px', marginLeft:0, marginBottom:'5px'}}/>
          <p><strong>{stepCount/1000}k</strong></p>
          <small>target</small>
          <img src={MinusIcon} alt='-' onClick={stepDecrement} style={{cursor:'pointer',borderRadius:0, height:'16px', marginLeft:0, marginTop:'2px'}}/>
        </div>
      </div>

      <div className='date-container'>    
          <div className='icon-container' style={{background:'transparent'}}>
            <img src={ProfileIcon} alt='dp' style={{height:'14.5px', borderRadius:0, margin:0}}/>
            <p>{perfDate}</p>
          </div>
          <div className={"icon-container" + (checkDate ? " active" : "")} style={{gap:'7.5px'}}>
            <img src={CalIcon} alt='dp' style={{height:'20px', borderRadius:0, margin:0}}/>
            <p>{schdDate}</p>
          </div>
     </div>

     <Link to={`/${props.UserId}/workout`}>
      <img src={(props.Feedback === true ? ArrowExl : ArrowBox)} alt='icon' style={{height:'63px', borderRadius:0, cursor:'pointer', marginLeft:0}}/>
     </Link>
     
     <div className="progressbar">     
     <div className='text' style={{position:'absolute', left:'16px', top:'22.5px',color:'white', lineHeight:'10px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <p style={{fontWeight:700, fontSize:'12px', margin:0}}>{props.CalorieIntake}</p>
          <small style={{fontWeight:500, fontSize:'8px', margin:0, color:'#BDBCBE'}}>calories</small>
     </div>
     <BootstrapTooltip
                title={
                  <div
                    style={{
                      fontFamily: "Montserrat",
                      height: "165px",
                      background: "#333B44",
                      width: "fit-content",
                      padding: "0 5.5px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                      borderRadius: "6.4px"
                    }}
                  >
                    <Progressbar
                      bgcolor="#F45C84"
                      consumed={pC}
                      targetAmount={pT}
                      header="PROTEIN"
                    />
                    <Progressbar
                      bgcolor="#03C6FA"
                      consumed={fC}
                      targetAmount={fT}
                      header="FATS"
                    />
                    <Progressbar
                      bgcolor="#F0C50F"
                      consumed={cC}
                      targetAmount={cT}
                      header="CARBS"
                    />
                  </div>
                }
              >
                <div>
     <PieChart
        data={dataMock}
        lineWidth={23}
      />
      </div>
      </BootstrapTooltip>

      <div className="usrname" style={{display:'flex', flexDirection:'column' ,alignItems:'center', lineHeight:'17px', letterSpacing:'0.5px', justifyContent:'center'}}>
          <img src={PlusIcon} alt='+' onClick={calorieIncrement} style={{cursor:'pointer',borderRadius:0, height:'16px', marginLeft:0, marginBottom:'6px'}}/>
          <p><strong>{calorieCount/1000}k</strong></p>
          <small>target</small>
          <img src={MinusIcon} alt='-' onClick={calorieDecrement} style={{cursor:'pointer',borderRadius:0, height:'16px', marginLeft:0, marginTop:'2px'}}/>
        </div>
        
      </div>
      

      <Link to={`/${props.UserId}/nutrition`}>
        <img src={ArrowBox} alt='icon' style={{height:'60px', borderRadius:0, cursor:'pointer'}}/>
      </Link>
      
      <div className='notification-container' style={{display:'flex', alignItems:'center', justifyContent:'center',height:'40px', width:'40px', background:'#36F5C7', borderRadius:'8px', marginLeft:'57px', marginRight:'15px'}}>
        <img src={BellIcon} alt='bell' style={{height:'20px', marginLeft: 0, borderRadius:0}}/>
      </div>

    </div>
    </>
  );
}
