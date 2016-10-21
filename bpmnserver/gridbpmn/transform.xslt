<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL">

  <xsl:template match="bpmn:process">
		<table>
      <xsl:for-each select="bpmn:startEvent">    <tr>
      <td>	
      exports.<xsl:value-of select="@name"/>
      = function(data, done) {<br/>
	    // called after the start event arrived at MyStart<br/>
	    console.log('running <xsl:value-of select="@name"/>');<br/>done(data);<br/>
	};
      </td>     

    </tr>
      </xsl:for-each>
      
      <xsl:for-each select="bpmn:task">   
      <tr>
      <td>	
exports.<xsl:value-of select="@name"/> = function(data, done) {<br/>
    // called at the beginning of <xsl:value-of select="@name"/><br/>
    console.log('running <xsl:value-of select="@name"/>');<br/>done(data);<br/>
};

      </td> 
    </tr>  
    <tr>
      <td>	

exports.<xsl:value-of select="@name"/>Done = function(data, done) {<br/>
    // Called after the process has been notified that the <xsl:value-of select="@name"/> task has been finished<br/>
    // by invoking myProcess.taskDone().<br/>
    // Note: "task name" + "Done" handler are only called for <br/>
    // user tasks, manual task, and unspecified tasks<br/>
    console.log('running <xsl:value-of select="@name"/>');<br/>done(data);<br/>
};
      </td>     

    </tr>
      </xsl:for-each>
            <xsl:for-each select="bpmn:userTask">   
      <tr>
      <td>	
exports.<xsl:value-of select="@name"/> = function(data, done) {<br/>
    // called at the beginning of <xsl:value-of select="@name"/><br/>
    console.log('running <xsl:value-of select="@name"/>');<br/>done(data);<br/>
};

      </td> 
    </tr>  
    <tr>
      <td>	

exports.<xsl:value-of select="@name"/>Done = function(data, done) {<br/>
    // Called after the process has been notified that the <xsl:value-of select="@name"/> task has been finished<br/>
    // by invoking myProcess.taskDone().<br/>
    // Note: "task name" + "Done" handler are only called for <br/>
    // user tasks, manual task, and unspecified tasks<br/>
    console.log('running <xsl:value-of select="@name"/>');<br/>done(data);<br/>
};
      </td>     

    </tr>
      </xsl:for-each>
<xsl:for-each select="bpmn:sendTask">   
      <tr>
      <td>	
exports.<xsl:value-of select="@name"/> = function(data, done) {<br/>
    // called at the beginning of <xsl:value-of select="@name"/><br/>
    // to send some message<br/>
    console.log('running <xsl:value-of select="@name"/>');<br/>done(data);<br/>
};

      </td> 
    </tr>  

      </xsl:for-each>
    <xsl:for-each select="bpmn:boundaryEvent"> 
    	   <tr>
      <td>	
      exports.<xsl:value-of select="@name"/>
      = function(data, done) {<br/>
	    // called after the <xsl:value-of select="@name"/> event arrived<br/>
	    console.log('running <xsl:value-of select="@name"/>');<br/>done(data);<br/>
			};
      </td>  

    </tr>
    <xsl:if test="//bpmn:timerEventDefinition">
    	exports.<xsl:value-of select="@name"/>$getTimeout = function(data, done) {<br/>
	    // called when arriving on <xsl:value-of select="@name"/><br/>
	    // should return timeout in ms.<br/>
    	return 1000;<br/>
			};<br/>
    	</xsl:if> 
    </xsl:for-each>
    <xsl:for-each select="bpmn:intermediateThrowEvent">    <tr>
      <td>	
      exports.<xsl:value-of select="@name"/>
      = function(data, done) {<br/>
	    // called after the <xsl:value-of select="@name"/> event arrived<br/>
	    console.log('running <xsl:value-of select="@name"/>');<br/>done(data);<br/>
	};
      </td>     

    </tr>
    </xsl:for-each>
    <xsl:for-each select="bpmn:exclusiveGateway">    <tr>
      <td>	
      exports.<xsl:value-of select="@name"/>
      = function(data, done) {<br/>
	    // called after arriving at<xsl:value-of select="@name"/><br/>
	    console.log('running <xsl:value-of select="@name"/>');<br/>done(data);<br/>
	};
      </td>     

    </tr><tr>
      <td>	
      exports.<xsl:value-of select="@name"/>$ok
      = function(data) {<br/>
	       // has to return true or false<br/>
		    // the name of the sequence flow follows after "$".<br/>
		    // if there is no name, an error is thrown <br/>
			    return true;<br/>
			};
      </td>     

    </tr><tr>
      <td>	
      exports.<xsl:value-of select="@name"/>$nok 
      = function(data) {<br/>
	       // has to return true or false<br/>
		    // the name of the sequence flow follows after "$".<br/>
		    // if there is no name, an error is thrown <br/>
			    return false;<br/>
			};
      </td>     

    </tr>
    </xsl:for-each>
    <!--并发网关-->
    <xsl:for-each select="bpmn:parallelGateway">    <tr>
      <td>	
      exports.<xsl:value-of select="@name"/>
      = function(data, done) {<br/>
	    // called after token flows arriving at<xsl:value-of select="@name"/><br/>
	    console.log('running <xsl:value-of select="@name"/>');<br/>done(data);<br/>
	};
      </td>     

    </tr><tr>
      <td>	
      exports.<xsl:value-of select="@name"/>$ok
      = function(data) {<br/>
	       // has to return true or false<br/>
		    // the name of the sequence flow follows after "$".<br/>
		    // if there is no name, an error is thrown <br/>
			    return true;<br/>
			};
      </td>     

    </tr><tr>
      <td>	
      exports.<xsl:value-of select="@name"/>$nok 
      = function(data) {<br/>
	       // has to return true or false<br/>
		    // the name of the sequence flow follows after "$".<br/>
		    // if there is no name, an error is thrown <br/>
			    return false;<br/>
			};
      </td>     

    </tr>
    </xsl:for-each>
    
   <xsl:for-each select="bpmn:endEvent">    <tr>
      <td>	
      exports.<xsl:value-of select="@name"/>
      = function(data, done) {<br/>
	    // called after the start event arrived at MyStart<br/>
	    console.log('running <xsl:value-of select="@name"/>');<br/>done(data);<br/>
	};
      </td>     

    </tr>
      </xsl:for-each>
</table>
  </xsl:template>
</xsl:stylesheet>