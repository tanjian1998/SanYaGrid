<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <head>
        <title>第一个XSLT文件</title>
      </head>
      <body>
        <xsl:apply-templates select="xml"></xsl:apply-templates>
      </body>
    </html>
  </xsl:template>
  <xsl:template match="xml"> 
    <table style="background-color:orange">
      <tr>
        <th>书名</th>
        <th>作者</th>
        <th>日期</th>
      </tr>
      <xsl:apply-templates select="book">
      	
        <xsl:value-of select="@name"/>
      	
      </xsl:apply-templates>
    </table>
  </xsl:template>
  <xsl:template match="book">
    <tr>
      <td>
        <xsl:value-of select="name"/>
      </td>
      <td>
        <xsl:value-of select="author"/>
      </td>
      <td>
        <xsl:value-of select="date"/>
      </td>
    </tr>
  </xsl:template>
</xsl:stylesheet>