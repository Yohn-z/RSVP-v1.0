package com.rssp.rssp.response;

import java.io.Serializable;

/**
 * 返回结果类
 * @author 印国林
 * @time 下午2:02:15
 */
public class Result implements Serializable{

	//返回状态
	private boolean success;
	//状态信息
	private String message;
	//返回对象
	private Object object;
	
	public Object getObject() {
		return object;
	}
	public void setObject(Object object) {
		this.object = object;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Result(boolean success, String message) {
		super();
		this.success = success;
		this.message = message;
	}
	public Result(boolean success, String message, Object object) {
		super();
		this.success = success;
		this.message = message;
		this.object = object;
	}
	
	
	
}
