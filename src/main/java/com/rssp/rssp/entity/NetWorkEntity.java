package com.rssp.rssp.entity;

public class NetWorkEntity {
    /**
     * "id":editor.templateId,
     * "name":name,
     * "pic" : pic,
     * "topologyJson":jsonS,
     * "type": 1
     */
    private long id;
    private String name;
    private String pic;
    private String topologyJson;
    private int type;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public String getTopologyJson() {
        return topologyJson;
    }

    public void setTopologyJson(String topologyJson) {
        this.topologyJson = topologyJson;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}
