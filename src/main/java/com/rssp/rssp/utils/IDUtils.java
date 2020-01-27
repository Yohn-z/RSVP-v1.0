package com.rssp.rssp.utils;

import java.util.Random;


/**
 * 随机生成id工具类
 * <p>Title: IDUtils</p>
 * <p>Description: </p>
 * <p>Company: </p> 
 * @author	程素波
 * @date	2018年2月28日下午1:04:27
 * @version 1.0
 */
public class IDUtils {

	/**
	 * 图片名生成
	 */
	public static String genImageName() {
		//取当前时间的长整形值包含毫秒
		long millis = System.currentTimeMillis();
		//long millis = System.nanoTime();
		//加上三位随机数
		Random random = new Random();
		int end3 = random.nextInt(999);
		//如果不足三位前面补0
		String str = millis + String.format("%03d", end3);
		
		return str;
	}
	
	/**
	 * id生成(15位)
	 */
	public static long genItemId() {
		//取当前时间的长整形值包含毫秒
		long millis = System.currentTimeMillis();
		//long millis = System.nanoTime();
		//加上两位随机数
		Random random = new Random();
		int end2 = random.nextInt(99);
		//如果不足两位前面补0
		String str = millis + String.format("%02d", end2);
		Long id = new Long(str);
		return id;
	}

    /**
     * 生成酒编号（YF+8位）
     * @return
     */
	public static String getSpiritId(){

        String s = genItemId()+"";
        String substring = s.substring(6, 14);
        return "YF-"+substring;

    }


	

	/**
	 * 生成短信验证码
	 * @return
	 */
	public static long getSixNumber(){
		
		return (long)((Math.random()*9+1)*100000);

	}

	public  String generateIdOfTen() {
		String randomNumber = getRandomNumberByNum(10);
		long time = System.currentTimeMillis();
		return time + randomNumber;
	}
	public  String getRandomNumberByNum(int num) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < num; i++) {
			long randomNum = Math.round(Math.floor(Math.random() * 10.0D));
			sb.append(randomNum);
		}
		return sb.toString();
	}

	public static void main(String[] args){
        System.out.println(getSpiritId());
    }
}
